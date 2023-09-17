import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ChatMessagesCreateRequestDto,
    type ChatMessagesResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const joinRoom = createAction(`${sliceName}/join-room`, (chatId: string) => {
    return {
        payload: chatId,
    };
});

const leaveRoom = createAction(`${sliceName}/leave-room`, (chatId: string) => {
    return {
        payload: chatId,
    };
});

const getAllMessages = createAsyncThunk<
    ChatMessagesResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-messages`, async (_, { extra }) => {
    const { chatApi } = extra;

    return await chatApi.getAllMessages();
});

const getAllMessagesByChatId = createAsyncThunk<
    ChatMessagesResponseDto[],
    Partial<ChatMessagesResponseDto>,
    AsyncThunkConfig
>(`${sliceName}/get-messages-by-chat-id`, async (chatId, { extra }) => {
    const { chatApi } = extra;

    return await chatApi.getAllMessagesByChatId(chatId);
});

const createMessage = createAsyncThunk<
    ChatMessagesResponseDto,
    ChatMessagesCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-message`, async (createPayload, { extra }) => {
    const { chatApi } = extra;
    const { message, senderId, receiverId, chatId } = createPayload;

    return await chatApi.createMessage({
        message,
        senderId,
        receiverId,
        chatId,
    });
});

const addMessage = createAction(
    `${sliceName}/add-message`,
    (message: ChatMessagesResponseDto) => {
        return {
            payload: message,
        };
    },
);

export {
    addMessage,
    createMessage,
    getAllMessages,
    getAllMessagesByChatId,
    joinRoom,
    leaveRoom,
};
