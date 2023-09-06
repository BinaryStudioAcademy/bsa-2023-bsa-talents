import { profileStep, skillsStep } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    profileStep,
    skillsStep,
};

export { allActions as actions };
export { reducer } from './slice.js';
