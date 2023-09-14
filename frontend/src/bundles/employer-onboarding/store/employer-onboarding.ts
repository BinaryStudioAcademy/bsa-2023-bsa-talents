import { createEmployerDetails } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createEmployerDetails,
};

export { allActions as actions };
export { reducer } from './slice.js';
