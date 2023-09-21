import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { CHAT_LIST_ITEMS } from '~/bundles/chat/constants/constants';
import { type ChatDataRequestDto } from '~/bundles/chat/types/types';
import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { clearChatStore, getMessage, sendMessage } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    chatData: Record<string, ChatDataRequestDto[]> | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    //TODO delete mock-data
    chatData: CHAT_LIST_ITEMS,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(clearChatStore, (state) => {
            state.dataStatus = DataStatus.IDLE;
            state.chatData = null;
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            const message = action.payload;
            const { chatId } = message;

            if (!state.chatData) {
                state.chatData = {};
            }

            state.chatData[chatId].unshift(message);
        });
        builder.addMatcher(
            isAnyOf(getMessage.pending, sendMessage.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(getMessage.rejected, sendMessage.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
