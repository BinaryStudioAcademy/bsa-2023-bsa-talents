import { type AnyAction, type Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';

import { notificationService } from '~/services/services.js';

const errorHandler: Middleware = function () {
    return function (next) {
        return function (action: AnyAction) {
            if (isRejected(action)) {
                const message = action.error.message;
                notificationService.error(message);
            }

            return next(action);
        };
    };
};

export { errorHandler };
