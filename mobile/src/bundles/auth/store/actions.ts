import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users';

import { name as sliceName } from './slice';

const signUp = createAsyncThunk<
    UserSignUpResponseDto,
    UserSignUpRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-up`, (signUpPayload, { extra }) => {
    const { authApi } = extra;
    return authApi.signUp(signUpPayload);
});

const signIn = createAsyncThunk<
    UserSignInResponseDto,
    UserSignInRequestDto,
    AsyncThunkConfig
>(`${sliceName}/sign-in`, (signInPayload, { extra }) => {
    const { authApi } = extra;
    return authApi.signIn(signInPayload);
});

export { signIn, signUp };
