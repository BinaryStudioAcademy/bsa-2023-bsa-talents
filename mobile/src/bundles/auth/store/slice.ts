import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { type UserFindResponseDto } from '~/bundles/auth/types/types';
import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { signIn, signUp } from './actions';

type UserData = UserFindResponseDto & {
    isProfileComplete: boolean;
};
// TODO: Replace user data with shared UserData Type

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    isSignedIn: boolean;
    currentUser: UserData | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    isSignedIn: false,
    currentUser: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(signUp.fulfilled, signIn.fulfilled),
            (state, { payload }) => {
                const { email, id, role } = payload;
                state.dataStatus = DataStatus.FULFILLED;
                state.currentUser = {
                    email,
                    role,
                    id,
                    isProfileComplete: false,
                };
                state.isSignedIn = true;
            },
        );
        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.isSignedIn = false;
            state.currentUser = null;
        });
        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.isSignedIn = false;
                state.currentUser = null;
            },
        );
    },
});

export { actions, name, reducer };
