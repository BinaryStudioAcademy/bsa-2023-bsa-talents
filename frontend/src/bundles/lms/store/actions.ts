import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiPath } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { mapBsaBadges } from '../helpers/map-bsa-badges.js';
import { type MappedBSABadge, type UserLMSDataDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const getTalentBadges = createAsyncThunk<
    MappedBSABadge[],
    string,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.USERS}`, async (userId, { extra }) => {
    const { lmsApi } = extra;

    const badges = await lmsApi.getTalentBadges(userId);

    return mapBsaBadges(badges.items);
});

const getTalentLmsData = createAsyncThunk<
    UserLMSDataDto | null,
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

export { getTalentBadges, getTalentLmsData };
