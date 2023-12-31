import {
    type AnyAction,
    configureStore,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import flipper from 'redux-flipper';

import { authApi } from '~/bundles/auth/auth';
import { reducer as authReducer } from '~/bundles/auth/store/slice';
import { chatApi } from '~/bundles/chat/chat';
import { reducer as chatReducer } from '~/bundles/chat/store';
import { commonApi } from '~/bundles/common/common';
import { AppEnvironment } from '~/bundles/common/enums/enums';
import { reducer as commonReducer } from '~/bundles/common/store';
import { commonDataApi } from '~/bundles/common-data/common-data';
import { reducer as commonDataReducer } from '~/bundles/common-data/store';
import { employerApi } from '~/bundles/employer/employer';
import { reducer as employeesReducer } from '~/bundles/employer/store';
import { fileUploadApi } from '~/bundles/file-upload/file-upload';
import { type Config } from '~/framework/config/config';
import { notifications } from '~/framework/notifications/notifications';
import { socketMiddleware, storage } from '~/framework/storage/storage';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    chat: ReturnType<typeof chatReducer>;
    common: ReturnType<typeof commonReducer>;
    employees: ReturnType<typeof employeesReducer>;
    commonData: ReturnType<typeof commonDataReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    notifications: typeof notifications;
    chatApi: typeof chatApi;
    commonApi: typeof commonApi;
    storage: typeof storage;
    employerApi: typeof employerApi;
    commonDataApi: typeof commonDataApi;
    fileUploadApi: typeof fileUploadApi;
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
                employees: employeesReducer,
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
            chatApi,
            employerApi,
            commonApi,
            notifications,
            storage,
            commonDataApi,
            fileUploadApi,
        };
    }
}

export { Store };
