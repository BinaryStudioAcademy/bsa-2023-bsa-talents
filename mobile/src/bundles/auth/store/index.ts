import { signIn, signUp } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    signUp,
    signIn,
};

export { allActions as actions };
export { reducer } from './slice';
