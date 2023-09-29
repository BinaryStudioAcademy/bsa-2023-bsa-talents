import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type LMSDataServerResponseDto } from './../types/types.js';

const getTalentLmsData = createAsyncThunk<
    LMSDataServerResponseDto | null,
    { userId: string },
    AsyncThunkConfig
>('lms/lms-data', async (payload, { extra, rejectWithValue }) => {
    const { usersApi } = extra;

    try {
        const lmsData = await usersApi.getTalentLmsDataById(payload.userId);

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
