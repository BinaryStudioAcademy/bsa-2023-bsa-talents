import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type FilterValues,
    type HiringInfoCreateRequestDto,
    type HiringInfoFindRequestDto,
    type HiringInfoResponseDto,
    type UserDetailsFullResponseDto,
    type UserDetailsShortResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const getShortUserDetails = createAsyncThunk<
    UserDetailsShortResponseDto[],
    {
        role: FilterValues;
    },
    AsyncThunkConfig
>(`${sliceName}/get-short-details`, (payload, { extra }) => {
    const { userDetailsApi } = extra;

    return userDetailsApi.getShortUserDetailsByRole(payload);
});

const getFullUserDetails = createAsyncThunk<
    UserDetailsFullResponseDto,
    Partial<UserDetailsFullResponseDto>,
    AsyncThunkConfig
>(`${sliceName}/get-full-details`, (payload, { extra }) => {
    const { userDetailsApi } = extra;

    return userDetailsApi.getFullUserDetailsById(payload);
});

const approveUser = createAsyncThunk<
    Partial<UserDetailsFullResponseDto> | boolean,
    {
        userId: string;
    },
    AsyncThunkConfig
>(`${sliceName}/approve`, async (payload, { extra }) => {
    const { userDetailsApi } = extra;

    const response = await userDetailsApi.approve(payload);
    return response ? payload : response;
});

const denyUser = createAsyncThunk<
    Partial<UserDetailsFullResponseDto> | boolean,
    {
        userId: string;
        deniedReason: string;
    },
    AsyncThunkConfig
>(`${sliceName}/deny`, async (payload, { extra }) => {
    const { userDetailsApi } = extra;

    const response = await userDetailsApi.deny(payload);
    return response ? payload : response;
});

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

export {
    approveHiringInfo,
    approveUser,
    denyUser,
    getAllHiringInfo,
    getFullUserDetails,
    getShortUserDetails,
};
