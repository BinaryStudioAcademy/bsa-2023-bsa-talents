import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import flipper from 'redux-flipper';

import { authApi } from '~/bundles/auth/auth';
import { reducer as authReducer } from '~/bundles/auth/store/slice';
import { AppEnvironment } from '~/bundles/common/enums/enums';
import { gatherSelectedDataApi } from '~/bundles/gather-selected-data/gather-selected-data';
import { reducer as gatherSelectedDataReducer } from '~/bundles/gather-selected-data/store';
import { reducer as talentsReducer } from '~/bundles/talent/store';
import { talentApi } from '~/bundles/talent/talent';
import { type Config } from '~/framework/config/config';
import { notifications } from '~/framework/notifications/notifications';
import { storage } from '~/framework/storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    talents: ReturnType<typeof talentsReducer>;
    gatherSelectedData: ReturnType<typeof gatherSelectedDataReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    notifications: typeof notifications;
    talentApi: typeof talentApi;
    storage: typeof storage;
    gatherSelectedDataApi: typeof gatherSelectedDataApi;
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
                talents: talentsReducer,
                gatherSelectedData: gatherSelectedDataReducer,
            },
            middleware: (getDefaultMiddleware) => {
                const middleware = getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                });

                if (__DEV__) {
                    middleware.push(flipper());
                }

                return middleware;
            },
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            talentApi,
            notifications,
            storage,
            gatherSelectedDataApi,
        };
    }
}

export { Store };
