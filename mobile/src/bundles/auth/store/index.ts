import { signUp } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    signUp,
};

export { allActions as actions };
export { reducer } from './slice';
