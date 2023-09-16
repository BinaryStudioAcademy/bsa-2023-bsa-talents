import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ChatMessageGetAllItemResponseDto } from '../types/types.js';
import { createMessage } from './actions.js';

type State = {
    messages: ChatMessageGetAllItemResponseDto[];
    currentChatId: string | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    currentChatId: null,
    dataStatus: DataStatus.IDLE,
    messages: [],
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        joinRoom: (state, action) => {
            state.currentChatId = action.payload;
        },
        leaveRoom: (state) => {
            state.currentChatId = null;
        },
    },
    extraReducers(builder) {
        builder
            .addMatcher(isAnyOf(createMessage.pending), (state) => {
                state.dataStatus = DataStatus.PENDING;
            })
            .addMatcher(isAnyOf(createMessage.rejected), (state) => {
                state.dataStatus = DataStatus.REJECTED;
            })
            .addMatcher(isAnyOf(createMessage.fulfilled), (state) => {
                state.dataStatus = DataStatus.FULFILLED;
            });
    },
});

export { actions, name, reducer };
