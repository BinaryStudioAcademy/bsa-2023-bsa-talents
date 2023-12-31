import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { type UserFindResponseDto } from '~/bundles/auth/types/types';
import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { loadCurrentUser, logout, signIn, signUp } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    isSignedIn: boolean;
    currentUserData: UserFindResponseDto | null;
    isRedirectToEmployerScreen: boolean;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    isSignedIn: false,
    currentUserData: null,
    isRedirectToEmployerScreen: true,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        onChangeToEmployerScreen: (state) => {
            state.isRedirectToEmployerScreen = true;
        },
    },
    extraReducers(builder) {
        builder.addCase(loadCurrentUser.pending, (state) => {
            state.dataStatus = DataStatus.CHECK_TOKEN;
            state.isSignedIn = false;
            state.currentUserData = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.dataStatus = DataStatus.IDLE;
            state.isSignedIn = false;
            state.currentUserData = null;
        });
        builder.addCase(signUp.fulfilled, (state) => {
            state.isRedirectToEmployerScreen = false;
        });
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
        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.isSignedIn = false;
            state.currentUserData = null;
        });
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
