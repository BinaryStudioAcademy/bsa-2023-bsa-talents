import {
    completeBadgesStep,
    completeProfileStep,
    completeSkillsStep,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    completeProfileStep,
    completeBadgesStep,
    completeSkillsStep,
};

export { allActions as actions };
export { reducer } from './slice';
