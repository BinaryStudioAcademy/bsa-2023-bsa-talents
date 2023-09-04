import { signUpStep1 } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    signUpStep1,
};

export { allActions as actions };
export { reducer } from './slice.js';
