import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserFindResponseDto,
    type UserGetAllResponseDto,
} from '~/bundles/users/users.js';

import { name as sliceName } from './slice.js';

const loadAll = createAsyncThunk<
    UserGetAllResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (_, { extra }) => {
    const { userApi } = extra;

    return userApi.getAll();
});

const loadUser = createAsyncThunk<
    UserFindResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-current-user`, (_, { extra }) => {
    const { userApi } = extra;
    return userApi.getByToken();
});

export { loadAll, loadUser };
