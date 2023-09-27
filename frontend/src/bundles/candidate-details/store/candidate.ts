import {
    addMessageTemplate,
    editMessageTemplate,
    getContactWithTalent,
    removeMessageTemplate,
    shareContactsWithCompany,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    addMessageTemplate,
    editMessageTemplate,
    getContactWithTalent,
    removeMessageTemplate,
    shareContactsWithCompany,
};

export { allActions as actions };
export { reducer } from './slice.js';
