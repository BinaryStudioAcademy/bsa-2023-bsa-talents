import {
    createTalentDetails,
    getTalentDetails,
    updateOnboardingData,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createTalentDetails,
    getTalentDetails,
    updateOnboardingData,
};

export { allActions as actions };
export { reducer } from './slice';
