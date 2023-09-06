import { completeBadgesStep, completeProfileStep } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    completeProfileStep,
    completeBadgesStep,
};

export { allActions as actions };
export { reducer } from './slice';
