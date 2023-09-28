import {
    getBadgesData,
    getHardSkillsData,
    loadAllPartners,
    loadLMSData,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getBadgesData,
    getHardSkillsData,
    loadLMSData,
    loadAllPartners,
};

export { allActions as actions };
export { reducer } from './slice';
