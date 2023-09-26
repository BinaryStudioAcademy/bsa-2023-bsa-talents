import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import {
    type UserDetailsResponseDto,
    type ValueOf,
} from '~/bundles/common/types/types';

import { getTalents } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    talentsData: UserDetailsResponseDto[] | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    talentsData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employees',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getTalents.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.talentsData = payload;
        });
        builder.addCase(getTalents.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.talentsData = null;
        });
        builder.addCase(getTalents.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.talentsData = null;
        });
    },
});

export { actions, name, reducer };
