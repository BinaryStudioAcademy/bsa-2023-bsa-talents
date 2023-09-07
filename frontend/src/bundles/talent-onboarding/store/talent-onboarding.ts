import {
    bsaBadgesStep,
    contactsCVStep,
    profileStep,
    skillsStep,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    bsaBadgesStep,
    profileStep,
    skillsStep,
    contactsCVStep,
};

export { allActions as actions };
export { reducer } from './slice.js';
