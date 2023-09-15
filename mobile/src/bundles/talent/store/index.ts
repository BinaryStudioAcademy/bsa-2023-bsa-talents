import {
    clearTalentStore,
    createTalentDetails,
    getTalentDetails,
    updateOnboardingData,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createTalentDetails,
    clearTalentStore,
    getTalentDetails,
    updateOnboardingData,
};

export { allActions as actions };
export { reducer } from './slice';
