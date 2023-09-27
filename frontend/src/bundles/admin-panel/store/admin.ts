import {
    approveHiringInfo,
    approveUser,
    denyUser,
    getAllHiringInfo,
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
    approveHiringInfo,
    getAllHiringInfo,
};

export { allActions as actions };
export { reducer } from './slice.js';
