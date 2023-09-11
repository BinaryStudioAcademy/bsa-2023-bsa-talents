import {
    completeBadgesStep,
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
    completeBadgesStep,
    completeSkillsStep,
};

export { allActions as actions };
export { reducer } from './slice';
