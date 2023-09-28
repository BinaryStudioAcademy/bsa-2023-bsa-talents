import { getEmployerData } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getEmployerData,
};

export { allActions as actions };
export { reducer } from './slice.js';
