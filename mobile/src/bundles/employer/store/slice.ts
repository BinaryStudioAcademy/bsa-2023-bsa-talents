import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserDetailsResponseDto } from '~/bundles/talent/types/types';

import { getTalentsData } from './actions';

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
        builder.addCase(getTalentsData.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.talentsData = payload;
        });
        builder.addMatcher(isAnyOf(getTalentsData.pending), (state) => {
            state.dataStatus = DataStatus.PENDING;
            state.talentsData = null;
        });
        builder.addMatcher(isAnyOf(getTalentsData.rejected), (state) => {
            state.dataStatus = DataStatus.REJECTED;
            state.talentsData = null;
        });
    },
});

export { actions, name, reducer };
