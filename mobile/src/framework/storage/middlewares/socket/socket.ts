/* eslint-disable unicorn/prefer-regexp-test */
import { type AnyAction } from '@reduxjs/toolkit';
import EnvConfig from 'react-native-config';
import { type Middleware } from 'redux';
import { io } from 'socket.io-client';

import { actions as chatActions } from '~/bundles/chat/store';
import { SocketEvent } from '~/framework/storage/enums/enums';
import { type store } from '~/framework/store/store';

type Properties = {
    dispatch: typeof store.instance.dispatch;
};

const socket = io(`${EnvConfig.BASE_URL}/chat`);

const socketMiddleware: Middleware = ({ dispatch }: Properties) => {
    socket.on(SocketEvent.GET_MESSAGE, (message) => {
        void dispatch(chatActions.addMessage(message));
    });

    return (next) => (action: AnyAction) => {
        if (chatActions.joinRoom.match(action)) {
            socket.emit(SocketEvent.JOIN_ROOM, action.payload);
        }
        if (chatActions.leaveRoom.match(action)) {
            socket.emit(SocketEvent.LEAVE_ROOM, action.payload);
        }

        if (chatActions.createMessage.fulfilled.match(action)) {
            socket.emit(SocketEvent.SEND_MESSAGE, action.payload);
        }

        return next(action);
    };
};

export { socketMiddleware };
