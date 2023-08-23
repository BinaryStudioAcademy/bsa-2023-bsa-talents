import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as usersReducer } from '~/bundles/users/store/users.js';
import { userApi } from '~/bundles/users/users.js';
import { type Config } from '~/framework/config/config.js';
import { errorService } from '~/services/error/error.service.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    users: ReturnType<typeof usersReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            AnyAction,
            MiddlewareArray<
                [ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]
            >
        >
    >;

    public constructor(config: Config) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: {
                auth: authReducer,
                users: usersReducer,
            },
            middleware: (getDefaultMiddleware) => [
                ...getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                }),
                errorService,
            ],
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
        };
    }
}

export { Store };
