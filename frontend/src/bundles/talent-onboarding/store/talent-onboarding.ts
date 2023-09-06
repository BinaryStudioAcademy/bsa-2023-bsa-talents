import { contactsCVStep, profileStep } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    profileStep,
    contactsCVStep,
};

export { allActions as actions };
export { reducer } from './slice.js';
