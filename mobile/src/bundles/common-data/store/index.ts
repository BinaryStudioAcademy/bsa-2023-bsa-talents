import { getBadgesData, getHardSkillsData } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getBadgesData,
    getHardSkillsData,
};

export { allActions as actions };
export { reducer } from './slice';
