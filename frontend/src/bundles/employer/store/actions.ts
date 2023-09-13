import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type EmployerRegistrationDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const createEmployerDetails = createAsyncThunk<
    EmployerRegistrationDto,
    EmployerRegistrationDto,
    AsyncThunkConfig
>(`${sliceName}/create-employer`, (registerPayload) => {
    return registerPayload;
});

export { createEmployerDetails };
