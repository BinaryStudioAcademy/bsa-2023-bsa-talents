import { getTalentLmsData } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getTalentLmsData,
};

export { allActions as actions };
export { reducer } from './slice.js';
