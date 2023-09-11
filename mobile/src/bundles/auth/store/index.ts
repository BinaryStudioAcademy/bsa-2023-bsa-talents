import { loadCurrentUser, signIn, signUp } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    signUp,
    signIn,
    loadCurrentUser,
};

export { allActions as actions };
export { reducer } from './slice';
