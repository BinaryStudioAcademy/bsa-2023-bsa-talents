import { type FastifyInstance, type FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import { ErrorMessage } from 'shared/build/enums/enums.js';
import { AuthApiPath } from 'shared/build/index.js';

import { type UserService } from '~/bundles/users/users.js';
import { SERVED_PAGE_PATH } from '~/common/constants/constants.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
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
            headers: { authorization, referer },
        } = request;

        if (
            routerPath.includes(AuthApiPath.FORGOT_PASSWORD) ||
            routerPath.includes(AuthApiPath.RESET_PASSWORD)
        ) {
            return;
        }

        const isServedPagePath = routerPath === SERVED_PAGE_PATH;

        if (isServedPagePath) {
            return;
        }

        if (checkWhiteRoute({ routerPath, routerMethod })) {
            return;
        }

        const [, token] = authorization?.split(' ') ?? [];

        const isAuthPage =
            referer &&
            (referer.endsWith('/sign-in') || referer.endsWith('/sign-up'));

        if (!token && isAuthPage) {
            return;
        }

        if (!token && !isAuthPage) {
            throw new HttpError({
                message: ErrorMessage.UNAUTHORIZED_USER,
                status: HttpCode.UNAUTHORIZED,
            });
        }

        const { userService, tokenService } = services;
        const { payload } = await tokenService.decode(token);
        const authorizedUser = await userService.findById(payload.id as string);

        if (!authorizedUser) {
            throw new HttpError({
                message: ErrorMessage.INVALID_TOKEN,
                status: HttpCode.UNAUTHORIZED,
            });
        }

        request.user = authorizedUser;
    });

    done();
};

const authorization = fp(authorizationPlugin);

export { authorization };
