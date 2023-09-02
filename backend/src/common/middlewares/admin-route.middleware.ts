import { type preHandlerHookHandler } from 'fastify';

import { ErrorMessages, UserRole } from '../enums/enums.js';
import { HttpCode, HttpError } from '../http/http.js';

const adminRoute: preHandlerHookHandler = (request, reply, done) => {
    const { user } = request;

    const isAdmin = user?.role === UserRole.ADMIN;

    if (!isAdmin) {
        throw new HttpError({
            message: ErrorMessages.ROUTE_ADMIN_ONLY,
            status: HttpCode.FORBIDDEN,
        });
    }

    done();
};

export { adminRoute };
