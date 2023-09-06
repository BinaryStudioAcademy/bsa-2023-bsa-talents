import { completeProfileStep, completeSkillsStep } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    completeProfileStep,
    completeSkillsStep,
};

export { allActions as actions };
export { reducer } from './slice';
