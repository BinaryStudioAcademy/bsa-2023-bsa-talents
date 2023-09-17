import {
    addMessage,
    createMessage,
    getAllMessages,
    joinRoom,
    leaveRoom,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    createMessage,
    getAllMessages,
    joinRoom,
    leaveRoom,
    addMessage,
};

export { allActions as actions };
export { reducer } from './slice.js';
