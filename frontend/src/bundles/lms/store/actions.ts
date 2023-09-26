import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserLMSDataDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const getTalentLmsData = createAsyncThunk<
    UserLMSDataDto | null,
    UserLMSDataDto,
    AsyncThunkConfig
>(`${sliceName}/lms-data`, async (payload, { extra, rejectWithValue }) => {
    const { userDetailsApi } = extra;

    try {
        const lmsData = await userDetailsApi.getTalentLmsDataById(
            payload.userId,
        );

        return lmsData ?? null;
    } catch (error) {
        rejectWithValue({
            _type: 'rejected',
            error,
        });
        return null;
    }
});

export { getTalentLmsData };
