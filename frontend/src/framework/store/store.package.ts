import {
    type AnyAction,
    type MiddlewareArray,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { reducer as appReducer } from '~/app/store/app.js';
import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { reducer as candidateReducer } from '~/bundles/candidate/store/candidate.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { commonDataApi } from '~/bundles/common-data/common-data.js';
import { reducer as commonReducer } from '~/bundles/common-data/store/common-data.js';
import { employerOnBoardingApi } from '~/bundles/employer-onboarding/employer-onboarding.js';
import { reducer as employerOnboardingReducer } from '~/bundles/employer-onboarding/store/employer-onboarding.js';
import { reducer as employerReducer } from '~/bundles/employers/store/employers.js';
import { reducer as lmsReducer } from '~/bundles/lms/store/lms.js';
import { reducer as talentOnBoardingReducer } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { talentOnBoardingApi } from '~/bundles/talent-onboarding/talent-onboarding.js';
import { reducer as usersReducer } from '~/bundles/users/store/users.js';
import { userApi } from '~/bundles/users/users.js';
import { type Config } from '~/framework/config/config.js';
import { notification } from '~/services/services.js';

import { storage } from '../storage/storage.js';
import { chatSocket, errorHandler } from './middlewares/middlewares.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    talentOnBoarding: ReturnType<typeof talentOnBoardingReducer>;
    employer: ReturnType<typeof employerReducer>;
    employerOnBoarding: ReturnType<typeof employerOnboardingReducer>;
    commonData: ReturnType<typeof commonReducer>;
    lms: ReturnType<typeof lmsReducer>;
    users: ReturnType<typeof usersReducer>;
    app: ReturnType<typeof appReducer>;
    candidate: ReturnType<typeof candidateReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    talentOnBoardingApi: typeof talentOnBoardingApi;
    employerOnBoardingApi: typeof employerOnBoardingApi;
    notification: typeof notification;
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
                users: usersReducer,
                lms: lmsReducer,
                employerOnBoarding: employerOnboardingReducer,
                talentOnBoarding: talentOnBoardingReducer,
                employer: employerReducer,
                app: appReducer,
                candidate: candidateReducer,
                commonData: commonReducer,
            },
            middleware: (getDefaultMiddleware) => [
                errorHandler,
                ...getDefaultMiddleware({
                    thunk: {
                        extraArgument: this.extraArguments,
                    },
                }),
                chatSocket,
            ],
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            authApi,
            userApi,
            talentOnBoardingApi,
            employerOnBoardingApi,
            notification,
            storage,
            commonDataApi,
        };
    }
}

export { type RootReducer, Store };
