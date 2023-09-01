import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserRole } from '~/bundles/users/enums/enums';

import { signUp } from './actions';

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
    userData: UserData | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    isSignedIn: false,
    userData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUp.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            const { email, id, role } = payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.isSignedIn = true;
            state.userData = { email, id, role };
        });
        builder.addCase(signUp.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
