import {
    getTalentDetails,
    saveTalentDetails,
    updateTalentDetails,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    updateTalentDetails,
    getTalentDetails,
    saveTalentDetails,
};

export { allActions as actions };
export { reducer } from './slice.js';
