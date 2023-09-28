import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiPath } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { mapBsaBadges } from '../helpers/map-bsa-badges.js';
import { type MappedBSABadge } from '../types/types.js';
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

export { getTalentBadges };
