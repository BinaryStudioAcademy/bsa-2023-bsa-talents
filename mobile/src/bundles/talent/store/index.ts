import {
    clearTalentStore,
    createTalentDetails,
    getUserDetails,
    updateOnboardingData,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createTalentDetails,
    clearTalentStore,
    getUserDetails,
    updateOnboardingData,
};

export { allActions as actions };
export { reducer } from './slice';
