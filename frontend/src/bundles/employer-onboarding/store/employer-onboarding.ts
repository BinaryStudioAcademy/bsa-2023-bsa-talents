import { createEmployerDetails, updateEmployerDetails } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createEmployerDetails,
    updateEmployerDetails,
};

export { allActions as actions };
export { reducer } from './slice.js';
