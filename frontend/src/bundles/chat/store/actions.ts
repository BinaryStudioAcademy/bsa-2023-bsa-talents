import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ChatMessageCreateRequestDto,
    type ChatMessageGetAllItemResponseDto,
} from '../types/types.js';

const joinRoom = createAction('chat/join-room', (chatId: string) => {
    return {
        payload: chatId,
    };
});

const leaveRoom = createAction('chat/leave-room', (chatId: string) => {
    return {
        payload: chatId,
    };
});

const createMessage = createAsyncThunk<
    ChatMessageGetAllItemResponseDto,
    ChatMessageCreateRequestDto,
    AsyncThunkConfig
>('chat/create-message', () => {
    //TODO: remove when actions will be created
    return {
        id: 'heas13',
        senderId: 'fgdh1234',
        receiverId: '1133fgdh4',
        message: 'hello',
        isRead: false,
        chatId: 'jdldsj12',
    };
});

const addMessage = createAction(
    'chat/add-message',
    (message: ChatMessageGetAllItemResponseDto) => {
        return {
            payload: message,
        };
    },
);

export { addMessage, createMessage, joinRoom, leaveRoom };
