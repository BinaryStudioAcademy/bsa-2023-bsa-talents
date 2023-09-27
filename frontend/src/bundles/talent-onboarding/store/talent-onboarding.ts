import {
    getTalentDetails,
    saveTalentDetails,
    updateTalentDetails,
    updateTalentPublishedDate,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    updateTalentDetails,
    getTalentDetails,
    saveTalentDetails,
    updateTalentPublishedDate,
};

export { allActions as actions };
export { reducer } from './slice.js';
