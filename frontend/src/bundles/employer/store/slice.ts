import { createSlice } from '@reduxjs/toolkit';
import { type EmployerRegistrationDto } from 'shared/build/index.js';

import { DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD } from '../components/registration-page/constants/constants.js';
import { createEmployerDetails } from './actions.js';

const initialState: EmployerRegistrationDto = {
    ...DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employerRegistration',
    reducers: {},
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
