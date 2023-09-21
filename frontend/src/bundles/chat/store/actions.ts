import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ChatMessagesCreateRequestDto,
    type ChatResponseDto,
    type MessageResponseDto,
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
    MessageResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-messages`, async (_, { extra }) => {
    const { chatApi } = extra;

    const messages = await chatApi.getAllMessages();

    return messages.items;
});

const getAllChatsByUserId = createAsyncThunk<
    ChatResponseDto[],
    string,
    AsyncThunkConfig
>(`${sliceName}/get-messages-by-chat-id`, async (userId, { extra }) => {
    const { chatApi } = extra;
    const chats = await chatApi.getAllChatsByUserId(userId);

    return chats.items;
});

const getAllMessagesByChatId = createAsyncThunk<
    {
        chatId: string;
        messages: MessageResponseDto[];
    },
    string,
    AsyncThunkConfig
>(`${sliceName}/get-messages-by-chat-id`, async (chatId, { extra }) => {
    const { chatApi } = extra;
    const messages = await chatApi.getAllMessagesByChatId(chatId);

    return { chatId, messages: messages.items };
});

const createMessage = createAsyncThunk<
    MessageResponseDto,
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
    (message: MessageResponseDto) => {
        return {
            payload: message,
        };
    },
);

export {
    addMessage,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
    joinRoom,
    leaveRoom,
};
