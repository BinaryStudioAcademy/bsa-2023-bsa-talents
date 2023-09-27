import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type ChatMessagesCreateRequestDto,
    type ChatResponseDto,
    type MessageResponseDto,
} from '../types/types.js';
import { actions, name as sliceName } from './slice.js';

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
        employerDetails: {
            logoUrl: string;
            companyName: string;
            employerName: string;
            employerPosition: string;
            about: string;
            companyWebsite: string;
            employerId: string;
        };
    },
    { chatId: string; employerId: string },
    AsyncThunkConfig
>(
    `${sliceName}/get-messages-by-chat-id`,
    async ({ chatId, employerId }, { extra, dispatch }) => {
        const { chatApi, userDetailsApi } = extra;
        dispatch(actions.updateChatId(chatId));
        const messages = await chatApi.getAllMessagesByChatId(chatId);
        const employer = await userDetailsApi.getUserDetailsById(employerId);
        const employerDetails = {
            logoUrl: employer?.companyLogoId ?? '',
            companyName: employer?.companyName ?? '',
            employerName: employer?.fullName ?? '',
            employerPosition: employer?.employerPosition ?? '',
            about: employer?.description ?? '',
            companyWebsite: employer?.companyWebsite ?? '',
            employerId: employer?.userId ?? '',
        };

        return { chatId, messages: messages.items, employerDetails };
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

export {
    createMessage,
    getAllChatsByUserId,
    getAllMessages,
    getAllMessagesByChatId,
};
