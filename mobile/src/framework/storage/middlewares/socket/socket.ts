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

const socketMiddleware: Middleware = ({ dispatch }: Properties) => {
    const socket = io(EnvConfig.API_URL as string);

    socket.on(SocketEvent.GET_MESSAGE, (message) => {
        void dispatch(chatActions.addMessage(message));
    });

    return (next) => (action: AnyAction) => {
        switch (action.type) {
            case chatActions.joinRoom: {
                socket.emit(SocketEvent.JOIN_ROOM, action.payload);
                break;
            }
            case chatActions.leaveRoom: {
                socket.emit(SocketEvent.LEAVE_ROOM, action.payload);
                break;
            }
            case chatActions.createMessage: {
                socket.emit(SocketEvent.SEND_MESSAGE, action.payload);
                break;
            }
            default: {
                break;
            }
        }

        return next(action);
    };
};

export { socketMiddleware };
