import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type HiringInfoCreateRequestDto,
    type HiringInfoFindRequestDto,
    type HiringInfoResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const getAllHiringInfo = createAsyncThunk<
    HiringInfoFindRequestDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-all-hiring-info`, async (_, { extra }) => {
    const { adminApi } = extra;

    const hiringInfo = await adminApi.getAllHiringInfo();

    return hiringInfo.items;
});

const approveHiringInfo = createAsyncThunk<
    HiringInfoResponseDto,
    HiringInfoCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/approve-hiring-info`, async (approvePayload, { extra }) => {
    const { adminApi } = extra;
    return await adminApi.createHiringInfo(approvePayload);
});

export { approveHiringInfo, getAllHiringInfo };
