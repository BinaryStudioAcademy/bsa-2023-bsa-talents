import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';
import {
    type UserFindResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';
import { StorageKey } from '~/framework/storage/storage.js';

import { name as sliceName } from './slice.js';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
    const { authApi, storage } = extra;

    const data = await authApi.signUp(registerPayload);
    void storage.set(StorageKey.TOKEN, data.token);
    return data;
});

const signOut = createAsyncThunk<unknown, undefined, AsyncThunkConfig>(
    `${sliceName}/sign-out`,
    (_, { extra }) => {
        const { storage } = extra;

        void storage.drop(StorageKey.TOKEN);
    },
);

const loadUser = createAsyncThunk<
    UserFindResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}/get-current-user`, (_, { extra }) => {
    const { authApi } = extra;
    return authApi.getByToken();
});

export { loadUser, signOut, signUp };
