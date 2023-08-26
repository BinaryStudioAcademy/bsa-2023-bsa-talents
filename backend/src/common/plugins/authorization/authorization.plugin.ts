import { type FastifyInstance, type FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { AuthorizationErrorMessages } from 'shared/build/enums/enums.js';

import { type UserService } from '~/bundles/users/users.js';
import { ControllerHooks } from '~/common/controller/controller.js';
import { type TokenService } from '~/common/services/token/interfaces/interface.js';

type AuthOptions = {
    services: {
        userService: UserService;
        tokenService: TokenService;
    };
    routesWhiteList: string[];
};

const authorizationPlugin: FastifyPluginCallback<AuthOptions> = (
    fastify: FastifyInstance,
    { services, routesWhiteList }: AuthOptions,
    done,
) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(ControllerHooks.ON_REQUEST, async (request) => {
        const isWhiteRoute = routesWhiteList.includes(request.routerPath);

        if (isWhiteRoute) {
            return;
        }

        if (request.headers.authorization) {
            const { userService, tokenService } = services;

            const { payload } = await tokenService.decode(
                request.headers.authorization,
            );

            const authorizedUser = await userService.findById(
                payload.id as number,
            );

            if (!authorizedUser) {
                throw new Error(AuthorizationErrorMessages.NOT_AUTHORIZED);
            }

            request.user = authorizedUser;
        } else {
            throw new Error(AuthorizationErrorMessages.NOT_AUTHORIZED);
        }
    });

    done();
};

const authorization = fp(authorizationPlugin);

export { authorization };
