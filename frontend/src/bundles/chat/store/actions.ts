import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ChatMessageCreateRequestDto,
    type ChatMessageGetAllItemResponseDto,
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
    ChatMessageGetAllItemResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-messages`, async (_, { extra }) => {
    const { chatApi } = extra;

    return await chatApi.getAllMessages();
});

const getAllMessagesByChatId = createAsyncThunk<
    {
        chatId: string;
        messages: ChatMessageGetAllItemResponseDto[];
    },
    string,
    AsyncThunkConfig
>(`${sliceName}/get-messages-by-chat-id`, async (chatId, { extra }) => {
    const { chatApi } = extra;
    const messages = await chatApi.getAllMessagesByChatId(chatId);

    return { chatId, messages };
});

const createMessage = createAsyncThunk<
    ChatMessageGetAllItemResponseDto,
    ChatMessageCreateRequestDto,
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
    (message: ChatMessageGetAllItemResponseDto) => {
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
