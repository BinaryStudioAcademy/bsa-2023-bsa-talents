import {
    type AnyAction,
    combineReducers,
    type MiddlewareArray,
    type Reducer,
    type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { reducer as appReducer } from '~/app/store/app.js';
import { authApi } from '~/bundles/auth/auth.js';
import { reducer as authReducer } from '~/bundles/auth/store/auth.js';
import { reducer as candidateReducer } from '~/bundles/candidate/store/candidate.js';
import { chatApi } from '~/bundles/chat/chat.js';
import { reducer as chatReducer } from '~/bundles/chat/store/chat.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { employerOnBoardingApi } from '~/bundles/employer-onboarding/employer-onboarding.js';
import { reducer as employerOnboardingReducer } from '~/bundles/employer-onboarding/store/employer-onboarding.js';
import { reducer as employerReducer } from '~/bundles/employers/store/employers.js';
import { reducer as lmsReducer } from '~/bundles/lms/store/lms.js';
import { reducer as cabinetReducer } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
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
    lms: ReturnType<typeof lmsReducer>;
    users: ReturnType<typeof usersReducer>;
    app: ReturnType<typeof appReducer>;
    chats: ReturnType<typeof chatReducer>;
    candidate: ReturnType<typeof candidateReducer>;
    cabinet: ReturnType<typeof cabinetReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    userApi: typeof userApi;
    chatApi: typeof chatApi;
    talentOnBoardingApi: typeof talentOnBoardingApi;
    employerOnBoardingApi: typeof employerOnBoardingApi;
    notification: typeof notification;
    storage: typeof storage;
};

const combinedReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    lms: lmsReducer,
    chat: chatReducer,
    employerOnBoarding: employerOnboardingReducer,
    talentOnBoarding: talentOnBoardingReducer,
    employer: employerReducer,
    app: appReducer,
    candidate: candidateReducer,
    cabinet: cabinetReducer,
});

type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === 'app/resetStore') {
        state = {} as RootState;
    }
    return combinedReducer(state, action);
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
            reducer: rootReducer,
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
            chatApi,
            talentOnBoardingApi,
            employerOnBoardingApi,
            notification,
            storage,
        };
    }
}

export { type RootReducer, Store };
