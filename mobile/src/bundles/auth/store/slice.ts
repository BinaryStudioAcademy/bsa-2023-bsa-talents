import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

import { signIn, signUp } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    email: string | null;
    id: number | null;
    error: string | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    email: null,
    id: null,
    error: null,
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
            },
        );
        builder.addMatcher(isAnyOf(signUp.pending, signIn.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addMatcher(
            isAnyOf(signUp.rejected, signIn.rejected),
            (state, { payload }) => {
                state.dataStatus = DataStatus.REJECTED;
                state.error = payload ?? null;
            },
        );
    },
});

export { actions, name, reducer };
