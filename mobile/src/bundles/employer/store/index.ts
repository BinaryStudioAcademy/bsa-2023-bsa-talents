import { getFilteredTalents, getTalentsData } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getTalentsData,
    getFilteredTalents,
};

export { allActions as actions };
export { reducer } from './slice';
