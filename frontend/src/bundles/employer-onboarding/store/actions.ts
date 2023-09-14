import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type EmployerOnboardingDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const createEmployerDetails = createAsyncThunk<
    EmployerOnboardingDto,
    EmployerOnboardingDto,
    AsyncThunkConfig
>(`${sliceName}/create-employer`, (registerPayload) => {
    return registerPayload;
});

export { createEmployerDetails };
