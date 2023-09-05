import { setProfileStep } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    setProfileStep,
};

export { allActions as actions };
export { reducer } from './slice';
