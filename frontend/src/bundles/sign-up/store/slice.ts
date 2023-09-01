import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_SIGN_UP_PAYLOAD_STEP1 as initialState } from '~/bundles/sign-up/components/first-step/constants/constants.js';

import { signUpStep1 } from './actions.js';

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'signUp',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(signUpStep1.fulfilled, (state, action) => {
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
