import { type HttpMethod } from '~/common/http/http.js';
import { type ValidationSchema } from '~/common/types/types.js';

import { type ApiHandler } from './api-handler.type.js';
import { type PreHandlerHook } from './api-prehandler.type.js';

type ControllerRouteParameters = {
    path: string;
    method: HttpMethod;
    preHandler?: PreHandlerHook;
    handler: ApiHandler;
    validation?: {
        body?: ValidationSchema;
    };
};

export { type ControllerRouteParameters };
