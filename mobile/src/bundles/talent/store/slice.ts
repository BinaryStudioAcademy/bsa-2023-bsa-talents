import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

import { completeProfileStep } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    profileStepData: ProfileStepDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    profileStepData: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talents',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(completeProfileStep.fulfilled, (state, action) => {
            const {
                profileName,
                salaryExpectation,
                employmentType,
                experienceYears,
                jobTitle,
                location,
                description,
            } = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.profileStepData = {
                profileName,
                salaryExpectation,
                employmentType,
                experienceYears,
                jobTitle,
                location,
                description,
            };
        });
        builder.addCase(completeProfileStep.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(completeProfileStep.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
