import { type AnyAction, type Middleware } from '@reduxjs/toolkit';
import { isRejected } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const errorService: Middleware = function () {
    return function (next) {
        return function (action: AnyAction) {
            if (isRejected(action)) {
                toast.error(action.error.message);
            }

            return next(action);
        };
    };
};

export { errorService };
