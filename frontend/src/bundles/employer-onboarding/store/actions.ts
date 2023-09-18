import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserDetailsGeneralCustom } from '../types/types.js';
import { name as sliceName } from './slice.js';

const createEmployerDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/create-employer`,
    (registerPayload, { extra, rejectWithValue }) => {
        const { employerOnBoardingApi } = extra;

        try {
            return employerOnBoardingApi.createUserDetails(registerPayload);
        } catch {
            return rejectWithValue({
                _type: 'rejected',
                error: 'Bad request',
            });
        }
    },
);

const updateEmployerDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(
    `${sliceName}/update-employer`,
    (registerPayload, { extra, rejectWithValue }) => {
        const { employerOnBoardingApi } = extra;

        try {
            return employerOnBoardingApi.updateUserDetails(registerPayload);
        } catch {
            return rejectWithValue({
                _type: 'rejected',
                error: 'Bad request',
            });
        }
    },
);

export { createEmployerDetails, updateEmployerDetails };
