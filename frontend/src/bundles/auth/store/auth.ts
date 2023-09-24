import {
    forgotPassword,
    loadUser,
    resetPassword,
    signIn,
    signOut,
    signUp,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUp,
    signOut,
    loadUser,
    signIn,
    forgotPassword,
    resetPassword,
};

export { allActions as actions };
export { reducer, type State } from './slice.js';
