import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserRole } from '~/bundles/users/enums/enums';

import { signIn, signUp } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    isSignedIn: boolean;
    email: string | null;
    id: string | null;
    error: string | null;
    isProfileComplete: boolean;
    role: ValueOf<typeof UserRole> | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    email: null,
    id: null,
    error: null,
    role: null,
    isProfileComplete: false,
    isSignedIn: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(signUp.fulfilled, signIn.fulfilled),
            (state, { payload }) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.email = payload.email;
                state.id = payload.id;
                state.role = payload.role;
                state.isSignedIn = true;
            },
        );
        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.isSignedIn = false;
        });
        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected),
            (state, { payload }) => {
                state.dataStatus = DataStatus.REJECTED;
                state.error = payload ?? null;
                state.isSignedIn = false;
            },
        );
    },
});

export { actions, name, reducer };
