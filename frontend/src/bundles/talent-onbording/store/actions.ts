import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserSignUpStep1Dto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const signUpStep1 = createAsyncThunk<
    UserSignUpStep1Dto,
    UserSignUpStep1Dto,
    AsyncThunkConfig
>(`${sliceName}/step1`, (registerPayload) => {
    return registerPayload;
});

export { signUpStep1 };
