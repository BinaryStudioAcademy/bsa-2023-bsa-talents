import { getBsaBadgesData, getHardSkillsData } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getBsaBadgesData,
    getHardSkillsData,
};

export { allActions as actions };
export { reducer } from './slice.js';
