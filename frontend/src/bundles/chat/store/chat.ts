import { addMessage, createMessage, joinRoom, leaveRoom } from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    joinRoom,
    leaveRoom,
    addMessage,
    createMessage,
};

export { allActions as actions };
