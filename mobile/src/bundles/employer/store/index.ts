import { getTalents } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getTalents,
};

export { allActions as actions };
export { reducer } from './slice';
