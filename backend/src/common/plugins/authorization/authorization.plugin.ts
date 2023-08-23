import { type FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

import { ControllerHooks } from '~/common/controller/controller.js';
import { HttpCode } from '~/common/http/http.js';

type AuthOptions = {
    routesWhiteList: string[];
};

const authorizationPlugin: FastifyPluginCallback<AuthOptions> = (
    fastify,
    { routesWhiteList },
) => {
    fastify.addHook(ControllerHooks.ON_REQUEST, (request, reply) => {
        try {
            const isWhiteRoute = routesWhiteList.includes(request.routerPath);

            if (isWhiteRoute) {
                return;
            }

            // TODO: Token verification
            throw new Error('Route is not whitelisted');
        } catch (error) {
            void reply.code(HttpCode.UNAUTHORIZED).send(error);
        }
    });
};

const authorization = fp(authorizationPlugin);

export { authorization };
