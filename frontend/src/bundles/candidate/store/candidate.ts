import { addMessageTemplate, removeMessageTemplate } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    addMessageTemplate,
    removeMessageTemplate,
};

export { allActions as actions };
export { reducer } from './slice.js';
