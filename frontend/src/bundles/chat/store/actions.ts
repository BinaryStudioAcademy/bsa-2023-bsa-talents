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
    //{
    //     message: 'Hello',
    //     receiverId: 'nskndkaldn',
    //     chatId: 'ksdjlskfjl',
    // } = payload;
    return {
        id: 'heas13',
        receiver: { id: 'dslkjdlk', email: 'emp1@test.com', role: 'employer' },
        sender: { id: 'dslkjdlk', email: 'user1@test.com', role: 'talent' },
        message: 'hello',
        createdAt: '2023-09-15',
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
