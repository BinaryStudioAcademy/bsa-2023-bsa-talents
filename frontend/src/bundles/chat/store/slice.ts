import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { type ChatMessageGetAllItemResponseDto } from '../types/types.js';
import { createMessage } from './actions.js';

type State = {
    currentChatMessages: ChatMessageGetAllItemResponseDto[];
    currentChatId: string | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    currentChatMessages: [],
    currentChatId: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'chat',
    reducers: {},
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
