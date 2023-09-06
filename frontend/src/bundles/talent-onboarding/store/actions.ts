import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ProfileStepDto, type SkillsStepDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const profileStep = createAsyncThunk<
    ProfileStepDto,
    ProfileStepDto,
    AsyncThunkConfig
>(`${sliceName}/profile-step`, (registerPayload) => {
    return registerPayload;
});

const skillsStep = createAsyncThunk<
    SkillsStepDto,
    SkillsStepDto,
    AsyncThunkConfig
>(`${sliceName}/skills-step`, (registerPayload) => {
    return registerPayload;
});

export { profileStep, skillsStep };
