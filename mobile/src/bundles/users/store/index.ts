import { loadAll } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    loadAll,
};

export { allActions as actions };
export { reducer } from './slice';
