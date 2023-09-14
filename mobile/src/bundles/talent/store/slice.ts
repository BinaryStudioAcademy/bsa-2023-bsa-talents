import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type UserDetailsGeneralResponseDto } from '~/bundles/talent/types/types';

import {
    createTalentDetails,
    getTalentDetails,
    updateOnboardingData,
} from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    onboardingData: UserDetailsGeneralResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    onboardingData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talents',
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            (action) =>
                [
                    createTalentDetails.fulfilled.type,
                    updateOnboardingData.fulfilled.type,
                    getTalentDetails.fulfilled.type,
                ].includes(action.type),
            (state, action) => {
                state.dataStatus = DataStatus.FULFILLED;
                state.onboardingData = {
                    ...state.onboardingData,
                    ...action.payload,
                };
            },
        );
        builder.addMatcher(
            isAnyOf(
                createTalentDetails.pending,
                updateOnboardingData.pending,
                getTalentDetails.pending,
            ),
            (state) => {
                state.dataStatus = DataStatus.PENDING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                createTalentDetails.rejected,
                updateOnboardingData.rejected,
                getTalentDetails.rejected,
            ),
            (state) => {
                state.dataStatus = DataStatus.REJECTED;
            },
        );
    },
});

export { actions, name, reducer };
