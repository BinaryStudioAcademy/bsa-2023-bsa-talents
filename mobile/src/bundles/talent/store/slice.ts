import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    type ProfileStepDto,
    type UserDetailsResponseDto,
} from '~/bundles/talent/types/types';

import { createTalentDetails, updateOnboardingData } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    onboardingData: UserDetailsResponseDto | null;
    profileStepData1: ProfileStepDto | null;
    profileStepData2: ProfileStepDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    onboardingData: null,
    profileStepData1: null,
    profileStepData2: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talents',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createTalentDetails.fulfilled, (state, action) => {
            state.onboardingData = action.payload;
            state.profileStepData1 = { ...action.payload } as ProfileStepDto;
            state.dataStatus = DataStatus.FULFILLED;
        });

        builder.addCase(createTalentDetails.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addCase(createTalentDetails.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(updateOnboardingData.fulfilled, (state, action) => {
            state.profileStepData1 = { ...action.payload } as ProfileStepDto;
            state.dataStatus = DataStatus.FULFILLED;
        });

        builder.addCase(updateOnboardingData.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });

        builder.addCase(updateOnboardingData.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
