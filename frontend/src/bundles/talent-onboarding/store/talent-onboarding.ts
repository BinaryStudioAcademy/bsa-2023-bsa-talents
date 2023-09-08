import { createTalentDetails, updateTalentDetails } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    updateTalentDetails,
    createTalentDetails,
};

export { allActions as actions };
export { reducer } from './slice.js';
