import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
    type ChatMessagesCreateRequestDto,
    type ChatResponseDto,
    type MessageResponseDto,
} from '~/bundles/chat/types/types';
import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';

import { actions, name as sliceName } from './slice';

const createMessage = createAsyncThunk<
    MessageResponseDto,
    ChatMessagesCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/createMessage`, async (createMessagePayload, { extra }) => {
    const { chatApi, notifications } = extra;
    try {
        const { message, senderId, receiverId, chatId } = createMessagePayload;

        return await chatApi.createMessage({
            message,
            senderId,
            receiverId,
            chatId,
        });
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const getAllMessages = createAsyncThunk<
    MessageResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/getAllMessages`, async (_, { extra }) => {
    const { chatApi, notifications } = extra;
    try {
        const messages = await chatApi.getAllMessages();

        return messages.items;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const getAllMessagesByChatId = createAsyncThunk<
    {
        chatId: string;
        messages: MessageResponseDto[];
    },
    string,
    AsyncThunkConfig
>(
    `${sliceName}/getAllMessagesByChatId`,
    async (chatId, { extra, dispatch }) => {
        const { chatApi, notifications } = extra;
        try {
            dispatch(actions.updateChatId(chatId));
            const messages = await chatApi.getAllMessagesByChatId(chatId);

            return { chatId, messages: messages.items };
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            notifications.showError({ title: errorMessage });
            throw error;
        }
    },
);

const getAllChatsByUserId = createAsyncThunk<
    ChatResponseDto[],
    string,
    AsyncThunkConfig
>(`${sliceName}/getAllChatsByUserId`, async (userId, { extra }) => {
    const { chatApi, notifications } = extra;
    try {
        const chats = await chatApi.getAllChatsByUserId(userId);

        return chats.items;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const joinRoom = createAction(
    `${sliceName}/joinRoom`,
    (joinRoomPayload: string) => {
        return {
            payload: joinRoomPayload,
        };
    },
);

const leaveRoom = createAction(
    `${sliceName}/leaveRoom`,
    (leaveRoomPayload: string) => {
        return {
            payload: leaveRoomPayload,
        };
    },
);

const clearChatStore = createAction(`${sliceName}/clearChatStore`);

export {
    clearChatStore,
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
    joinRoom,
    leaveRoom,
};
