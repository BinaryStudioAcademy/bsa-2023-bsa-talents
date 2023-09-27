import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import {
    type FilterValues,
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
    const { adminApi } = extra;

    return adminApi.getShortUserDetailsByRole(payload);
});

const getFullUserDetails = createAsyncThunk<
    UserDetailsFullResponseDto,
    Partial<UserDetailsFullResponseDto>,
    AsyncThunkConfig
>(`${sliceName}/get-full-details`, (payload, { extra }) => {
    const { adminApi } = extra;

    return adminApi.getFullUserDetailsById(payload);
});

const approveUser = createAsyncThunk<
    Partial<UserDetailsFullResponseDto> | boolean,
    {
        userId: string;
    },
    AsyncThunkConfig
>(`${sliceName}/approve`, async (payload, { extra }) => {
    const { adminApi } = extra;

    const response = await adminApi.approve(payload);
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
    const { adminApi } = extra;

    const response = await adminApi.deny(payload);
    return response ? payload : response;
});

export { approveUser, denyUser, getFullUserDetails, getShortUserDetails };
