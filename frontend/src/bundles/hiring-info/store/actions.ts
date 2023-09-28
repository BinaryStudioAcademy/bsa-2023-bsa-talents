import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type FilterValues,
    type HiringInfoCreateRequestDto,
    type HiringInfoFindRequestDto,
    type HiringInfoFindResponseDto,
    type HiringInfoResponseDto,
    type UserDetailsFullResponseDto,
    type UserDetailsShortResponseDto,
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
    {
        userId: string;
    },
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

export {
    approveUser,
    denyUser,
    getAllHiringInfo,
    getFullUserDetails,
    getHiringInfo,
    getShortUserDetails,
    submitHiringInfo,
};
