import { type ServerAppRouteParameters } from '~/common/server-application/server-application.js';

type DefaultApiHandlerOptions = {
    body?: unknown;
    query?: unknown;
    params?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    query: T['query'];
    params: T['params'];
    headers: Parameters<ServerAppRouteParameters['handler']>[0]['headers'];
};

export { type ApiHandlerOptions };
