import { clearAll, loadAll } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    loadAll,
    clearAll,
};

export { allActions as actions };
export { reducer } from './slice';
