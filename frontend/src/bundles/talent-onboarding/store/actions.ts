import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type BsaBadgesStepDto,
    type ProfileStepDto,
} from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const profileStep = createAsyncThunk<
    ProfileStepDto,
    ProfileStepDto,
    AsyncThunkConfig
>(`${sliceName}/profile-step`, (registerPayload) => {
    return registerPayload;
});

const bsaBadgesStep = createAsyncThunk<
    BsaBadgesStepDto,
    BsaBadgesStepDto,
    AsyncThunkConfig
>(`${sliceName}/bsa-badges-step`, (registerPayload) => {
    return registerPayload;
});

export { bsaBadgesStep, profileStep };
