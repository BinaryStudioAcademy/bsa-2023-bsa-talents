import { type FastifyInstance, type FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { ErrorMessages } from 'shared/build/enums/enums.js';

import { type UserService } from '~/bundles/users/users.js';
import { ControllerHooks } from '~/common/packages/controller/controller.js';
import { type Token } from '~/common/packages/token/types/types.js';
import { checkWhiteRoute } from '~/common/server-application/helpers/check-white-route.helper.js';

type AuthOptions = {
    services: {
        userService: UserService;
        tokenService: Token;
    };
};

const authorizationPlugin: FastifyPluginCallback<AuthOptions> = (
    fastify: FastifyInstance,
    { services }: AuthOptions,
    done,
) => {
    fastify.decorateRequest('user', null);

    fastify.addHook(ControllerHooks.ON_REQUEST, async (request) => {
        const {
            routerPath,
            routerMethod,
            headers: { authorization },
        } = request;

        if (checkWhiteRoute({ routerPath, routerMethod })) {
            return;
        }

        const [, token] = authorization?.split(' ') ?? [];

        if (!token) {
            throw new Error(ErrorMessages.NOT_AUTHORIZED);
        }

        const { userService, tokenService } = services;
        const { payload } = await tokenService.decode(token);
        const authorizedUser = await userService.findById(payload.id as string);

        if (!authorizedUser) {
            throw new Error(ErrorMessages.NOT_AUTHORIZED);
        }

        request.user = authorizedUser;
    });

    done();
};

const authorization = fp(authorizationPlugin);

export { authorization };
