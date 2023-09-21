import {
    addMessage,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
    joinRoom,
    leaveRoom,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createMessage,
    getAllMessages,
    getAllChatsByUserId,
    getAllMessagesByChatId,
    joinRoom,
    leaveRoom,
    addMessage,
};

export { allActions as actions };
export { reducer } from './slice.js';
