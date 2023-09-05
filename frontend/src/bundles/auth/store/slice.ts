import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type UserFindResponseDto } from '~/bundles/users/users.js';

import { loadUser, signIn, signUp } from './actions.js';

type State = {
    currentUser: UserFindResponseDto | null;
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    currentUser: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder
            .addMatcher(
                isAnyOf(signUp.pending, loadUser.pending, signIn.pending),
                (state) => {
                    state.dataStatus = DataStatus.PENDING;
                },
            )
            .addMatcher(
                isAnyOf(signUp.rejected, loadUser.rejected, signIn.rejected),
                (state) => {
                    state.dataStatus = DataStatus.REJECTED;
                },
            )
            .addMatcher(
                isAnyOf(signUp.fulfilled, loadUser.fulfilled, signIn.fulfilled),
                (state, action) => {
                    state.dataStatus = DataStatus.FULFILLED;
                    state.currentUser = action.payload;
                },
            );
    },
});

export { actions, name, reducer };
