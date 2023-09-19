import { getHardSkills } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getHardSkills,
};

export { allActions as actions };
export { reducer } from './slice.js';
