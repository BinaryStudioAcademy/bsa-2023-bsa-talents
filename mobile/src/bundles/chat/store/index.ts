import {
    clearChatStore,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
    joinRoom,
    leaveRoom,
} from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    joinRoom,
    leaveRoom,
    clearChatStore,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
};

export { allActions as actions };
export { reducer } from './slice';
