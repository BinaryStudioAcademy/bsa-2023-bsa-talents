import { contactsCVStep, profileStep, skillsStep } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    profileStep,
    skillsStep,
    contactsCVStep,
};

export { allActions as actions };
export { reducer } from './slice.js';