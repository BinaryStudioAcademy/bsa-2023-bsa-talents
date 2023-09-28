import {
    getAllHiringInfo,
    getHiringInfo,
    submitHiringInfo,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    submitHiringInfo,
    getAllHiringInfo,
    getHiringInfo,
};

export { allActions as actions };
export { reducer } from './slice.js';
