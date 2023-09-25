import {
    clearCommonStore,
    createUserDetails,
    getUserDetails,
    updateOnboardingData,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createUserDetails,
    clearCommonStore,
    getUserDetails,
    updateOnboardingData,
};

export { allActions as actions };
export { reducer } from './slice';
