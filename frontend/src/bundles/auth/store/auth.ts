import { loadUser, signIn, signUp } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    loadUser,
    signIn,
};

export { allActions as actions };
export { reducer } from './slice.js';
