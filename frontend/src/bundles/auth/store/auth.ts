import { loadUser, signIn, signOut, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signOut,
    loadUser,
    signIn,
};

export { allActions as actions };
export { reducer, type State } from './slice.js';
