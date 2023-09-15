import { loadCurrentUser, logout, signIn, signUp } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    signUp,
    signIn,
    loadCurrentUser,
    logout,
};

export { allActions as actions };
export { reducer } from './slice';
