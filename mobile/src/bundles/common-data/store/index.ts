import {
    getBadgesData,
    getHardSkillsData,
    getTalentBadges,
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
    getTalentBadges,
};

export { allActions as actions };
export { reducer } from './slice';
