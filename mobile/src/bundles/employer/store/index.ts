import { getTalentsData } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getTalentsData,
};

export { allActions as actions };
export { reducer } from './slice';
