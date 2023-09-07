import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import fastifyStatic from '@fastify/static';
import swagger, { type StaticDocumentSpec } from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify, { type FastifyError } from 'fastify';
import multer from 'fastify-multer';

import { userService } from '~/bundles/users/users.js';
import { ServerErrorType } from '~/common/enums/enums.js';
import { type ValidationError } from '~/common/exceptions/exceptions.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Config } from '~/common/packages/config/config.js';
import { type Database } from '~/common/packages/database/database.js';
import { type Logger } from '~/common/packages/logger/logger.js';
import { token } from '~/common/packages/packages.js';
import { authorization } from '~/common/plugins/plugins.js';
import {
    type ServerCommonErrorResponse,
    type ServerValidationErrorResponse,
    type ValidationSchema,
} from '~/common/types/types.js';

import {
    type ServerApp,
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

type Constructor = {
    config: Config;
    logger: Logger;
    database: Database;
    apis: ServerAppApi[];
};

class ServerAppBase implements ServerApp {
    private config: Config;

    private logger: Logger;

    private database: Database;

    private apis: ServerAppApi[];

    private app: ReturnType<typeof Fastify>;

    public constructor({ config, logger, database, apis }: Constructor) {
        this.config = config;
        this.logger = logger;
        this.database = database;
        this.apis = apis;

        this.app = Fastify();
    }

    public addRoute(parameters: ServerAppRouteParameters): void {
        const { path, method, preHandler, handler, validation } = parameters;
        this.app.route({
            url: path,
            method,
            preHandler,
            handler,
            schema: {
                body: validation?.body,
            },
        });

        this.logger.info(`Route: ${method as string} ${path} is registered`);
    }

    public addRoutes(parameters: ServerAppRouteParameters[]): void {
        for (const it of parameters) {
            this.addRoute(it);
        }
    }

    public initRoutes(): void {
        const routers = this.apis.flatMap((it) => it.routes);

        this.addRoutes(routers);
    }

    private async initServe(): Promise<void> {
        const staticPath = join(
            dirname(fileURLToPath(import.meta.url)),
            '../../../public',
        );

        await this.app.register(fastifyStatic, {
            root: staticPath,
            prefix: '/',
        });

        this.app.setNotFoundHandler(async (_request, response) => {
            await response.sendFile('index.html', staticPath);
        });
    }

    public async initMiddlewares(): Promise<void> {
        await Promise.all(
            this.apis.map(async (it) => {
                this.logger.info(
                    `Generate swagger documentation for API ${it.version}`,
                );

                await this.app.register(swagger, {
                    mode: 'static',
                    specification: {
                        document:
                            it.generateDoc() as StaticDocumentSpec['document'],
                    },
                });

                await this.app.register(swaggerUi, {
                    routePrefix: `api/${it.version}/documentation`,
                });
            }),
        );
    }

    public async initPlugins(): Promise<void> {
        await this.app.register(multer.contentParser);
        await this.app.register(authorization, {
            services: {
                userService,
                tokenService: token,
            },
        });

        this.logger.info('Plugins registered on application');
    }

    private initValidationCompiler(): void {
        this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
            return <T>(data: T): ReturnType<ValidationSchema['validate']> => {
                return schema.validate(data, {
                    abortEarly: false,
                });
            };
        });
    }

    private initErrorHandler(): void {
        this.app.setErrorHandler(
            (error: FastifyError | ValidationError, _request, replay) => {
                if ('isJoi' in error) {
                    this.logger.error(`[Validation Error]: ${error.message}`);

                    for (const it of error.details) {
                        this.logger.error(
                            `[${it.path.toString()}] — ${it.message}`,
                        );
                    }

                    const response: ServerValidationErrorResponse = {
                        errorType: ServerErrorType.VALIDATION,
                        message: error.message,
                        details: error.details.map((it) => ({
                            path: it.path,
                            message: it.message,
                        })),
                    };

                    return replay
                        .status(HttpCode.UNPROCESSED_ENTITY)
                        .send(response);
                }

                if (error instanceof HttpError) {
                    this.logger.error(
                        `[Http Error]: ${error.status.toString()} – ${
                            error.message
                        }`,
                    );

                    const response: ServerCommonErrorResponse = {
                        errorType: ServerErrorType.COMMON,
                        message: error.message,
                    };

                    return replay.status(error.status).send(response);
                }

                this.logger.error(error.message);

                const response: ServerCommonErrorResponse = {
                    errorType: ServerErrorType.COMMON,
                    message: error.message,
                };

                return replay
                    .status(HttpCode.INTERNAL_SERVER_ERROR)
                    .send(response);
            },
        );
    }

    public async init(): Promise<void> {
        this.logger.info('Application initialization…');

        await this.initServe();

        await this.initMiddlewares();

        await this.initPlugins();

        this.initValidationCompiler();

        this.initErrorHandler();

        this.initRoutes();

        this.database.connect();

        await this.app
            .listen({
                port: this.config.ENV.APP.PORT,
                host: this.config.ENV.APP.HOST,
            })
            .catch((error: Error) => {
                this.logger.error(error.message, {
                    cause: error.cause,
                    stack: error.stack,
                });
            });

        this.logger.info(
            `Application is listening on PORT – ${this.config.ENV.APP.PORT.toString()}, on ENVIRONMENT – ${
                this.config.ENV.APP.ENVIRONMENT as string
            }.`,
        );
    }
}

export { ServerAppBase };
