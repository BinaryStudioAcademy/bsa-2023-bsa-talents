import {
    completeSkillsStep,
    createTalentDetails,
    getTalentDetails,
    setCompletedStep,
    updateOnboardingData,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    createTalentDetails,
    getTalentDetails,
    setCompletedStep,
    updateOnboardingData,
    completeSkillsStep,
};

export { allActions as actions };
export { reducer } from './slice';
