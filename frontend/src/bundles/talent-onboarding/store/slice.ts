import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_PAYLOAD_PROFILE_STEP as initialState } from '~/bundles/talent-onboarding/components/profile-step/constants/constants.js';

import { profileStep } from './actions.js';

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'signUp',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(profileStep.fulfilled, (state, action) => {
            const {
                profileName,
                salaryExpectation,
                employmentTypes,
                experienceYears,
                jobTitle,
                location,
                description,
            } = action.payload;
            state.description = description;
            state.employmentTypes = employmentTypes;
            state.experienceYears = experienceYears;
            state.jobTitle = jobTitle;
            state.location = location;
            state.profileName = profileName;
            state.salaryExpectation = salaryExpectation;
        });
    },
});

export { actions, name, reducer };
