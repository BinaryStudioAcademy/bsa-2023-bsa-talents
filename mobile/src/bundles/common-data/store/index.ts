import { getBadgesData, getHardSkillsData, loadAllPartners } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getBadgesData,
    getHardSkillsData,
    loadAllPartners,
};

export { allActions as actions };
export { reducer } from './slice';
