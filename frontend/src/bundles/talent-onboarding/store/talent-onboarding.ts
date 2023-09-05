import { bsaBadgesStep, profileStep } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    bsaBadgesStep,
    profileStep,
};

export { allActions as actions };
export { reducer } from './slice.js';
