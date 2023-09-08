import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { reducer as appReducer } from '~/app/store/app.js';
import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { reducer as lmsReducer } from '~/bundles/lms/store/lms.js';
import { reducer as talentOnBoardingReducer } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { reducer as usersReducer } from '~/bundles/users/store/users.js';
import { userApi } from '~/bundles/users/users.js';
import { type Config } from '~/framework/config/config.js';
import { notification } from '~/services/services.js';

import { storage } from '../storage/storage.js';
import { errorHandler } from './middlewares/middlewares.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    talentOnBoarding: ReturnType<typeof talentOnBoardingReducer>;
    lms: ReturnType<typeof lmsReducer>;
    users: ReturnType<typeof usersReducer>;
    app: ReturnType<typeof appReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    notification: typeof notification;
    storage: typeof storage;
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
                lms: lmsReducer,
                talentOnBoarding: talentOnBoardingReducer,
                app: appReducer,
            },
            middleware: (getDefaultMiddleware) => [
                errorHandler,
                ...getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                }),
            ],
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            notification,
            storage,
        };
    }
}

export { type RootReducer, Store };
