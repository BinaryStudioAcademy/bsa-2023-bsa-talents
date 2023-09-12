import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { type UserFindResponseDto } from '~/bundles/auth/types/types';
import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { loadCurrentUser, signIn, signUp } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    isSignedIn: boolean;
    currentUserData: UserFindResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    isSignedIn: false,
    currentUserData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(
                signUp.fulfilled,
                loadCurrentUser.fulfilled,
                signIn.fulfilled,
            ),
            (state, { payload }) => {
                const { email, id, role } = payload;
                state.dataStatus = DataStatus.FULFILLED;
                state.currentUserData = {
                    email,
                    role,
                    id,
                };
                state.isSignedIn = true;
            },
        );
        builder.addMatcher(
            isAnyOf(signUp.pending, loadCurrentUser.pending, signIn.pending),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
                state.isSignedIn = false;
                state.currentUserData = null;
            },
        );
        builder.addMatcher(
            isAnyOf(signUp.rejected, loadCurrentUser.rejected, signIn.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.isSignedIn = false;
                state.currentUserData = null;
            },
        );
    },
});

export { actions, name, reducer };
