import { createSlice } from '@reduxjs/toolkit';
import {
    type EmployerRegistrationDto,
    type UserDetailsCreateRequestDto,
} from 'shared/build/index.js';

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
            for (const key in action.payload) {
                const typedKey = key as keyof UserDetailsCreateRequestDto;
                state[typedKey] = action.payload[typedKey];
            }
        });
    },
});

export { actions, name, reducer };
