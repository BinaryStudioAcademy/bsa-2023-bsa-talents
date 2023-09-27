import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type HiringInfoCreateRequestDto,
    type HiringInfoFindRequestDto,
    type HiringInfoFindResponseDto,
    type HiringInfoResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const getAllHiringInfo = createAsyncThunk<
    HiringInfoFindResponseDto[],
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-all-hiring-info`, async (_, { extra }) => {
    const { hiringInfoApi } = extra;

    const { items } = await hiringInfoApi.getAllHiringInfo();

    return items;
});

const getHiringInfo = createAsyncThunk<
    boolean,
    HiringInfoFindRequestDto,
    AsyncThunkConfig
>(`${sliceName}/get-hiring-info`, async (findPayload, { extra }) => {
    const { hiringInfoApi } = extra;

    return await hiringInfoApi.getHiringInfo(findPayload);
});

const submitHiringInfo = createAsyncThunk<
    HiringInfoResponseDto,
    HiringInfoCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-hiring-info`, async (createPayload, { extra }) => {
    const { hiringInfoApi } = extra;
    return await hiringInfoApi.createHiringInfo(createPayload);
});

export { getAllHiringInfo, getHiringInfo, submitHiringInfo };
