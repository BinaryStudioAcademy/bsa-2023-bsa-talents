import swaggerJsdoc from 'swagger-jsdoc';

import { AppEnvironment } from '~/common/enums/enums.js';
import { type Config } from '~/common/packages/config/config.js';

import {
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

class ServerAppApiBase implements ServerAppApi {
    public version: string;

    public routes: ServerAppRouteParameters[];

    private config: Config;

    public constructor(
        version: string,
        config: Config,
        ...handlers: ServerAppRouteParameters[]
    ) {
        this.version = version;
        this.config = config;
        this.routes = handlers.map((it) => ({
            ...it,
            path: `/api/${this.version}${it.path}`,
        }));
    }

    public generateDoc(): ReturnType<typeof swaggerJsdoc> {
        const isStaging =
            this.config.ENV.APP.ENVIRONMENT === AppEnvironment.PRODUCTION ||
            this.config.ENV.APP.ENVIRONMENT === AppEnvironment.DEVELOPMENT;

        const controllerExtension = isStaging ? 'js' : 'ts';

        return swaggerJsdoc({
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Hello World',
                    version: `${this.version}.0.0`,
                },
                servers: [
                    {
                        url: `/api/${this.version}`,
                    },
                ],
            },
            apis: [`src/bundles/**/*.controller.${controllerExtension}`],
        });
    }
}

export { ServerAppApiBase };
