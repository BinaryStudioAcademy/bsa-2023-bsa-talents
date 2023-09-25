import { type FastifyRequest } from 'fastify';
import { type File as MulterFile } from 'fastify-multer/lib/interfaces.js';

import { type Logger } from '~/common/packages/logger/logger.js';
import { type ServerAppRouteParameters } from '~/common/server-application/server-application.js';

import {
    type ApiHandler,
    type ApiHandlerOptions,
    type Controller,
    type ControllerRouteParameters,
} from './types/types.js';

class ControllerBase implements Controller {
    private logger: Logger;

    private apiUrl: string;

    public routes: ServerAppRouteParameters[];

    public constructor(logger: Logger, apiPath: string) {
        this.logger = logger;
        this.apiUrl = apiPath;
        this.routes = [];
    }

    public addRoute(options: ControllerRouteParameters): void {
        const { handler, path } = options;
        const fullPath = this.apiUrl + path;

        this.routes.push({
            ...options,
            path: fullPath,
            handler: (request, reply) =>
                this.mapHandler(handler, request, reply),
        });
    }

    private async mapHandler(
        handler: ApiHandler,
        request: Parameters<ServerAppRouteParameters['handler']>[0],
        reply: Parameters<ServerAppRouteParameters['handler']>[1],
    ): Promise<void> {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);
        const handlerOptions = this.mapRequest(request);
        const { status, payload } = await handler(handlerOptions);

        return await reply.status(status).send(payload);
    }

    private mapRequest(
        request: Parameters<ServerAppRouteParameters['handler']>[0],
    ): ApiHandlerOptions {
        const requestWithFiles = request as FastifyRequest & {
            files?: MulterFile[];
        };
        const { body, query, params, headers, files } = requestWithFiles;
        if (files) {
            return {
                body: { ...(body as object), files },
                query,
                params,
                headers,
            };
        }
        return {
            body,
            query,
            params,
            headers,
        };
    }
}

export { ControllerBase };
