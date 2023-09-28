import {
    approveUser,
    denyUser,
    getAllHiringInfo,
    getFullUserDetails,
    getHiringInfo,
    getShortUserDetails,
    submitHiringInfo,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    approveUser,
    denyUser,
    getFullUserDetails,
    getShortUserDetails,
    submitHiringInfo,
    getAllHiringInfo,
    getHiringInfo,
};

export { allActions as actions };
export { reducer } from './slice.js';
