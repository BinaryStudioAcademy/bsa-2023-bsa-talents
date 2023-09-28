import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { employerDataMapper } from '../helpers/mapper/employers-data-mapper.js';
import { type EmployerDataDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const getEmployerData = createAsyncThunk<
    EmployerDataDto | null,
    string,
    AsyncThunkConfig
>(`${sliceName}/get-employer-data`, async (id, { extra, rejectWithValue }) => {
    const { userDetailsApi } = extra;

    try {
        const userDetails = await userDetailsApi.getUserDetailsById(id);
        return userDetails ? employerDataMapper(userDetails) : null;
    } catch (error) {
        rejectWithValue({
            _type: 'rejected',
            error,
        });
        return null;
    }
});

export { getEmployerData };
