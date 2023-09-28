import { getTalentBadges } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getTalentBadges,
};

export { allActions as actions };
export { reducer } from './slice.js';
