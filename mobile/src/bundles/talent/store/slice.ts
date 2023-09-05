import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';
import { type ProfileStepDto } from '~/bundles/talent/types/types';

import { setProfileStep } from './actions';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    //TODO get current user, whose data should be changed
    userData: object;
    profileFormData: ProfileStepDto;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    userData: {},
    profileFormData: {
        profileName: '',
        salaryExpectation: 0,
        employmentTypes: [],
        experienceYears: 0,
        jobTitle: '',
        location: '',
        description: '',
    },
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'talents',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(setProfileStep.fulfilled, (state, action) => {
            const {
                profileName,
                salaryExpectation,
                employmentTypes,
                experienceYears,
                jobTitle,
                location,
                description,
            } = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
            state.userData = {
                profileName,
                salaryExpectation,
                employmentTypes,
                experienceYears,
                jobTitle,
                location,
                description,
            };
        });
        builder.addCase(setProfileStep.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(setProfileStep.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer };
