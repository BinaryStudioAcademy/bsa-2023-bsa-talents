import { createTalentDetails, updateOnboardingData } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createTalentDetails,
    updateOnboardingData,
};

export { allActions as actions };
export { reducer } from './slice';
