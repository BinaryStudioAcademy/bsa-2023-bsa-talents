import { getEmployerData, searchCandidates, setFilters } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getEmployerData,
    searchCandidates,
    setFilters,
};

export { allActions as actions };
export { reducer } from './slice.js';
