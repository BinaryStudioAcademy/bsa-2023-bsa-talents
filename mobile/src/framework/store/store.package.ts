import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import flipper from 'redux-flipper';

import { authApi } from '~/bundles/auth/auth';
import { reducer as authReducer } from '~/bundles/auth/store/slice';
import { reducer as chatReducer } from '~/bundles/chat/store';
import { commonApi } from '~/bundles/common/common';
import { AppEnvironment } from '~/bundles/common/enums/enums';
import { reducer as commonReducer } from '~/bundles/common/store';
import { commonDataApi } from '~/bundles/common-data/common-data';
import { reducer as commonDataReducer } from '~/bundles/common-data/store';
import { type Config } from '~/framework/config/config';
import { notifications } from '~/framework/notifications/notifications';
import { socketMiddleware, storage } from '~/framework/storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    chat: ReturnType<typeof chatReducer>;
    common: ReturnType<typeof commonReducer>;
    commonData: ReturnType<typeof commonDataReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    notifications: typeof notifications;
    commonApi: typeof commonApi;
    storage: typeof storage;
    commonDataApi: typeof commonDataApi;
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
                chat: chatReducer,
                common: commonReducer,
                commonData: commonDataReducer,
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

                middleware.push(socketMiddleware);

                return middleware;
            },
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            commonApi,
            notifications,
            storage,
            commonDataApi,
        };
    }
}

export { Store };
