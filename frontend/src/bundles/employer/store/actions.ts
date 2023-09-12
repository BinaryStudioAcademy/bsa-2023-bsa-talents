import { createAsyncThunk } from '@reduxjs/toolkit';
import { type EmployerRegistrationDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const createEmployerDetails = createAsyncThunk<
    EmployerRegistrationDto,
    AsyncThunkConfig
>(`${sliceName}/create-employer`, (registerPayload) => {
    return registerPayload;
});

export { createEmployerDetails };
