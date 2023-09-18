import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';

import { DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD } from '../components/onboarding-form/constants/constants.js';
import { type UserDetailsGeneralCustom } from '../types/types.js';
import { createEmployerDetails } from './actions.js';

const initialState: UserDetailsGeneralCustom = {
    ...DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'employerOnboarding',
    reducers: {},
    extraReducers(builder) {
        builder.addCase(createEmployerDetails.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            const data: UserDetailsGeneralCustom = action.payload;

            for (const key in data) {
                const typedKey = key as keyof UserDetailsGeneralCustom;
                if (Object.keys(state).includes(key)) {
                    state[typedKey] = data[typedKey];
                }
            }
        });
    },
});

export { actions, name, reducer };
