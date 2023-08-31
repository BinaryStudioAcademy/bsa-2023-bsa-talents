import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserRole } from '~/bundles/users/enums/enums';

import { signIn, signUp } from './actions';

type UserData = {
    email: string | null;
    id: string | null;
    role: ValueOf<typeof UserRole> | null;
    isProfileComplete: boolean;
};
// TODO: Replace user data with shared UserData Type

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    isSignedIn: boolean;
    userData: UserData;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    isSignedIn: false,
    userData: {
        email: null,
        id: null,
        role: null,
        isProfileComplete: false,
    },
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
                state.userData = { email, role, id, isProfileComplete: false };
                state.isSignedIn = true;
            },
        );
        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.isSignedIn = false;
        });
        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
                state.isSignedIn = false;
            },
        );
    },
});

export { actions, name, reducer };
