import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD } from '../components/onboarding-form/constants/constants.js';
import { type EmployerOnboardingDto } from '../types/types.js';
import { createEmployerDetails } from './actions.js';

const initialState: EmployerOnboardingDto = {
    ...DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employerOnboarding',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createEmployerDetails.fulfilled, (state, action) => {
            const data = action.payload;

            // for (const key in data) {
            //     const typedKey = key as keyof EmployerOnboardingDto;
            //     state[typedKey] = data[typedKey];
            // }

            // TODO: change this to above one
            // state.photo = data.photo;
            // state.companyLogo = data.companyLogo;

            state.fullName = data.fullName as string;
            state.employerPosition = data.employerPosition as string;
            state.companyName = data.companyName as string;
            state.companyWebsite = data.companyWebsite as string;
            state.location = data.location as string;
            state.description = data.description as string;
        });
    },
});

export { actions, name, reducer };
