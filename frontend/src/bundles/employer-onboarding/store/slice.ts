import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD } from '../components/onboarding-form/constants/constants.js';
import { type EmployerOnboardingDto } from '../types/types.js';
import { createEmployerDetails } from './actions.js';

const initialState: EmployerOnboardingDto = {
    ...DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD,
    hasChangesInDetails: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employerOnboarding',
    reducers: {
        setHasChangesInDetails: (state, action) => {
            state.hasChangesInDetails = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(createEmployerDetails.fulfilled, (state, action) => {
            const data = action.payload;

            state.photo = data.photo;
            state.fullName = data.fullName;
            state.position = data.position;
            state.companyName = data.companyName;
            state.companyWebsite = data.companyWebsite;
            state.location = data.location;
            state.description = data.description;
            state.companyLogo = data.companyLogo;
            state.linkedInLink = data.linkedInLink;
        });
    },
});

export { actions, name, reducer };
