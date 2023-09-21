import { getMessage, joinRoom, leaveRoom, sendMessage } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    getMessage,
    joinRoom,
    leaveRoom,
    sendMessage,
};

export { allActions as actions };
export { reducer } from './slice';
