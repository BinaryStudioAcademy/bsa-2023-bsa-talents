import {
    // addMessage,
    createMessage,
    getAllChatsByUserId,
    getAllChatsByUserId,
    getAllMessages,
    // joinRoom,
    // leaveRoom,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllChatsByUserId,
    // joinRoom,
    // leaveRoom,
    // addMessage,
};

export { allActions as actions };
export { reducer } from './slice.js';
