import {
    clearCommonStore,
    createUserDetails,
    getTalents,
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
    getTalents,
};

export { allActions as actions };
export { reducer } from './slice';
