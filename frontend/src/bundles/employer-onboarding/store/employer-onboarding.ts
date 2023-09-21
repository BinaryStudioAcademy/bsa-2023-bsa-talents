import {
    createEmployerDetails,
    getEmployerDetails,
    saveEmployerDetails,
    updateEmployerDetails,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createEmployerDetails,
    getEmployerDetails,
    saveEmployerDetails,
    updateEmployerDetails,
};

export { allActions as actions };
export { reducer } from './slice.js';
