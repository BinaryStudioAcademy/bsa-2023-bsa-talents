import {
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
};

export { allActions as actions };
export { reducer } from './slice.js';
