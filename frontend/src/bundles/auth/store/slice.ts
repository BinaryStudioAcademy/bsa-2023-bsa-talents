import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserFindResponseDto } from '~/bundles/users/users.js';

import { loadUser, signUp } from './actions.js';

type State = {
    currentUser: UserFindResponseDto;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    currentUser: { id: 0, email: '' },
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state) => {
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(signUp.rejected, (state) => {
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
