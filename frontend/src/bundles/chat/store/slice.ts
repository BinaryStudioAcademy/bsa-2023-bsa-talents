import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ChatMessagesResponseDto } from '../types/types.js';
import {
    createMessage,
    getAllMessages,
    getAllMessagesByChatId,
} from './actions.js';

type State = {
    messages: ChatMessagesResponseDto[];
    current: {
        chatId: string | null;
        messages: ChatMessagesResponseDto[];
    };
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    messages: [],
    current: {
        chatId: null,
        messages: [],
    },
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        joinRoom: (state, action) => {
            const chatId = action.payload;
            state.current.chatId = chatId;
            state.current.messages = [];
        },
        leaveRoom: (state) => {
            state.current.chatId = null;
            state.current.messages = [];
        },
        addMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
            state.current.messages = [
                ...state.current.messages,
                action.payload,
            ];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.messages = action.payload;
            })
            .addCase(getAllMessagesByChatId.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.current.chatId = action.payload.chatId;
                state.current.messages = action.payload.messages;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.messages = [...state.messages, action.payload];
                state.current.messages = [
                    ...state.current.messages,
                    action.payload,
                ];
            })
            .addMatcher(
                isAnyOf(
                    getAllMessages.pending,
                    getAllMessagesByChatId.pending,
                    createMessage.pending,
                ),
                (state) => {
                    state.dataStatus = DataStatus.PENDING;
                },
            )
            .addMatcher(
                isAnyOf(
                    getAllMessages.rejected,
                    getAllMessagesByChatId.rejected,
                    createMessage.rejected,
                ),
                (state) => {
                    state.dataStatus = DataStatus.REJECTED;
                },
            );
    },
});

export { actions, name, reducer };
