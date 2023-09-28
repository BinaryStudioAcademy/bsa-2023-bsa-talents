import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiPath } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type BsaBadgesResponseDto } from '../../types/types.js';
import { name as sliceName } from './slice.js';

const getBsaBadgesData = createAsyncThunk<
    BsaBadgesResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.BSA_BADGES}`, (_, { extra }) => {
    const { bsaBadgesApi } = extra;

    return bsaBadgesApi.getAllBsaBadges();
});

export { getBsaBadgesData };
