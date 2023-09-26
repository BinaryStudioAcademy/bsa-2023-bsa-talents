import {
    approveUser,
    denyUser,
    getFullUserDetails,
    getShortUserDetails,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    approveUser,
    denyUser,
    getFullUserDetails,
    getShortUserDetails,
};

export { allActions as actions };
export { reducer } from './slice.js';
