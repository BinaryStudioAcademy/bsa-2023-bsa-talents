import { notify } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    notify,
};

export { allActions as actions };
export { reducer } from './slice.js';
