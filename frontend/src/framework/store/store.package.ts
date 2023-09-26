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
import { reducer as candidateReducer } from '~/bundles/candidate-components/store/candidate.js';
import { chatApi } from '~/bundles/chat/chat.js';
import { reducer as chatReducer } from '~/bundles/chat/store/chat.js';
import { bsaBadgesApi } from '~/bundles/common/data/bsa-badges/bsa-badges.js';
import { reducer as bsaBadgesReducer } from '~/bundles/common/data/bsa-badges/store/bsa-badges.js';
import { hardSkillsApi } from '~/bundles/common/data/hard-skills/hard-skills.js';
import { reducer as hardSkillsReducer } from '~/bundles/common/data/hard-skills/store/hard-skills.js';
import { AppEnvironment } from '~/bundles/common/enums/enums.js';
import { employerOnBoardingApi } from '~/bundles/employer-onboarding/employer-onboarding.js';
import { reducer as employerOnboardingReducer } from '~/bundles/employer-onboarding/store/employer-onboarding.js';
import { fileUploadApi } from '~/bundles/file-upload/file-upload.js';
import { reducer as lmsReducer } from '~/bundles/lms/store/lms.js';
import { reducer as cabinetReducer } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
import { searchCandidatesApi } from '~/bundles/search-candidates/search-candidates.js';
import { reducer as searchCandidatesReducer } from '~/bundles/search-candidates/store/search-candidates.js';
import { reducer as talentOnBoardingReducer } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { talentOnBoardingApi } from '~/bundles/talent-onboarding/talent-onboarding.js';
import { userDetailsApi } from '~/bundles/user-details/user-details.js';
import { type Config } from '~/framework/config/config.js';
import { notification } from '~/services/services.js';

import { storage } from '../storage/storage.js';
import { chatSocket, errorHandler } from './middlewares/middlewares.js';

type RootReducer = {
    auth: ReturnType<typeof authReducer>;
    talentOnBoarding: ReturnType<typeof talentOnBoardingReducer>;
    searchCandidates: ReturnType<typeof searchCandidatesReducer>;
    employerOnBoarding: ReturnType<typeof employerOnboardingReducer>;
    hardSkills: ReturnType<typeof hardSkillsReducer>;
    lms: ReturnType<typeof lmsReducer>;
    app: ReturnType<typeof appReducer>;
    chats: ReturnType<typeof chatReducer>;
    candidate: ReturnType<typeof candidateReducer>;
    bsaBadges: ReturnType<typeof bsaBadgesReducer>;
    cabinet: ReturnType<typeof cabinetReducer>;
    chat: ReturnType<typeof chatReducer>;
};

type ExtraArguments = {
    authApi: typeof authApi;
    chatApi: typeof chatApi;
    fileUploadApi: typeof fileUploadApi;
    talentOnBoardingApi: typeof talentOnBoardingApi;
    employerOnBoardingApi: typeof employerOnBoardingApi;
    searchCandidatesApi: typeof searchCandidatesApi;
    notification: typeof notification;
    storage: typeof storage;
    hardSkillsApi: typeof hardSkillsApi;
    bsaBadgesApi: typeof bsaBadgesApi;
    userDetailsApi: typeof userDetailsApi;
};

const combinedReducer = combineReducers({
    auth: authReducer,
    lms: lmsReducer,
    chat: chatReducer,
    employerOnBoarding: employerOnboardingReducer,
    talentOnBoarding: talentOnBoardingReducer,
    searchCandidates: searchCandidatesReducer,
    app: appReducer,
    candidate: candidateReducer,
    cabinet: cabinetReducer,
    bsaBadges: bsaBadgesReducer,
    hardSkills: hardSkillsReducer,
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
            chatApi,
            fileUploadApi,
            talentOnBoardingApi,
            employerOnBoardingApi,
            searchCandidatesApi,
            notification,
            storage,
            hardSkillsApi,
            bsaBadgesApi,
            userDetailsApi,
        };
    }
}

export { type RootReducer, Store };
