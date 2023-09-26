import { type Middleware } from '@reduxjs/toolkit';

import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import { type MessageResponseDto } from '~/bundles/chat/types/types.js';
import {
    socket,
    SocketEvent,
    SocketNamespace,
} from '~/framework/socket/socket.js';
import { type store } from '~/framework/store/store.js';

type SocketMiddlewareParameters = {
    dispatch: typeof store.instance.dispatch;
};

const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

const chatSocket: Middleware = ({ dispatch }: SocketMiddlewareParameters) => {
    chatSocketInstance.on(
        SocketEvent.CHAT_ADD_MESSAGE,
        (message: MessageResponseDto) => {
            dispatch(chatActions.addMessage(message));
        },
    );
    return (next) =>
        (action): void => {
            if (chatActions.joinRoom.match(action)) {
                chatSocketInstance.emit(
                    SocketEvent.CHAT_JOIN_ROOM,
                    action.payload,
                );
            }
            if (chatActions.leaveRoom.match(action)) {
                chatSocketInstance.emit(
                    SocketEvent.CHAT_LEAVE_ROOM,
                    action.payload,
                );
            }

            if (chatActions.createMessage.fulfilled.match(action)) {
                chatSocketInstance.emit(
                    SocketEvent.CHAT_CREATE_MESSAGE,
                    action.payload,
                );
            }
            return next(action);
        };
};

export { chatSocket };
