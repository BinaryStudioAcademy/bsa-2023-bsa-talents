import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ChatMessagesCreateRequestDto,
    type ChatResponseDto,
    type MessageResponseDto,
} from '../types/types.js';
import { actions, name as sliceName } from './slice.js';

// const joinRoom = createAction(`${sliceName}/join-room`, (payload: { userId: string, chatId: string} ) => {
//     console.log("DO I RUN?")
//     return {
//         payload
//     };
// });

// const leaveRoom = createAction(`${sliceName}/leave-room`, (chatId: string) => {
//     return {
//         payload: chatId,
//     };
// });

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
>(`${sliceName}/get-chats-by-user-id`, async (userId, { extra }) => {
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
>(
    `${sliceName}/get-messages-by-chat-id`,
    async (chatId, { extra, dispatch }) => {
        const { chatApi } = extra;
        dispatch(actions.updateChatId(chatId));
        const messages = await chatApi.getAllMessagesByChatId(chatId);

        return { chatId, messages: messages.items };
    },
);

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

// const addMessage = createAction(
//     `${sliceName}/add-message`,
//     (message: MessageResponseDto) => {
//         console.log("ACTIONS: " , message)

//         return {
//             payload: message,
//         };
//     },
// );

export {
    // addMessage,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
    // joinRoom,
    // leaveRoom,
};
