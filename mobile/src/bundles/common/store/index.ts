import {
    clearCommonStore,
    createUserDetails,
    getUserDetails,
    updateOnboardingData,
    updatePublishedData,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createUserDetails,
    clearCommonStore,
    getUserDetails,
    updateOnboardingData,
    updatePublishedData,
};

export { allActions as actions };
export { reducer } from './slice';
