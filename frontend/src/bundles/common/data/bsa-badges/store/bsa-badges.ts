import { getBsaBadgesData } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getBsaBadgesData,
};

export { allActions as actions };
export { reducer } from './slice.js';
