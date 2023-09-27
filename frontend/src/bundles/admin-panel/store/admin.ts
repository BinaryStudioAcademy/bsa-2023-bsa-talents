import { approveHiringInfo, getAllHiringInfo } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    approveHiringInfo,
    getAllHiringInfo,
};

export { allActions as actions };
export { reducer } from './slice.js';
