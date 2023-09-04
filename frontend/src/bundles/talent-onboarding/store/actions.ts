import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    type ContactsCVStepDto,
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

const contactsCVStep = createAsyncThunk<
    ContactsCVStepDto,
    ContactsCVStepDto,
    AsyncThunkConfig
>(`${sliceName}/contacts-cv-step`, (registerPayload) => {
    return registerPayload;
});

export { contactsCVStep, profileStep };
