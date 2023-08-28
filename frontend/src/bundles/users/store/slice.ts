import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import {
    type UserFindResponseDto,
    type UserGetAllItemResponseDto,
} from '~/bundles/users/users.js';

import { loadAll, loadUser } from './actions.js';

type State = {
    currentUser: UserFindResponseDto;
    users: UserGetAllItemResponseDto[];
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    currentUser: { id: 0, email: '' },
    users: [],
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'users',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loadAll.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadAll.fulfilled, (state, action) => {
            state.users = action.payload.items;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadAll.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(loadUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(loadUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
