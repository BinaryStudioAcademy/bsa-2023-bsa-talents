import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type ChatDataRequestDto } from '~/bundles/chat/types/types';
import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import { type AsyncThunkConfig } from '~/bundles/common/types/types';

import { name as sliceName } from './slice';

const sendMessage = createAsyncThunk<
    ChatDataRequestDto,
    ChatDataRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sendMessage`, (sendMessagePayload, { extra }) => {
    const { notifications } = extra;
    try {
        return sendMessagePayload;
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        notifications.showError({ title: errorMessage });
        throw error;
    }
});

const getMessage = createAsyncThunk<
    ChatDataRequestDto,
    ChatDataRequestDto,
    AsyncThunkConfig
>(`${sliceName}/getMessage`, (getMessagePayload, { extra }) => {
    const { notifications } = extra;
    try {
        return getMessagePayload;
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

export { clearChatStore, getMessage, joinRoom, leaveRoom, sendMessage };
