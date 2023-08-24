import { type FastifyInstance, type FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

import { type UserFindResponseDto } from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/users.js';
import { ControllerHooks } from '~/common/controller/controller.js';
import { HttpCode } from '~/common/http/http.js';
import { token } from '~/common/token/token.js';

type AuthOptions = {
    services: {
        userService: UserService;
    };
    routesWhiteList: string[];
};

declare module 'fastify' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface FastifyRequest {
        user: UserFindResponseDto;
    }
}

const authorizationPlugin: FastifyPluginCallback<AuthOptions> = (
    fastify: FastifyInstance,
    { services, routesWhiteList }: AuthOptions,
    done,
) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(ControllerHooks.ON_REQUEST, async (request, reply) => {
        try {
            const isWhiteRoute = routesWhiteList.includes(request.routerPath);

            if (isWhiteRoute) {
                return;
            }

            if (request.headers.authorization) {
                const { payload } = await token.decode(
                    request.headers.authorization,
                );
                const { userService } = services;

                const authorizedUser = await userService.find(
                    payload.id as number,
                );
                if (!authorizedUser) {
                    throw new Error(
                        'You are not authorized to access this route.',
                    );
                }

                request.user = authorizedUser;
            } else {
                throw new Error('You are not authorized to access this route.');
            }
        } catch (error) {
            void reply.code(HttpCode.UNAUTHORIZED).send(error);
        }
    });

    done();
};

const authorization = fp(authorizationPlugin);

export { authorization };
