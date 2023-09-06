import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type ProfileStepDto,
    type SkillsStepDto,
} from '~/bundles/talent/types/types';

import { name as sliceName } from './slice';

const completeProfileStep = createAsyncThunk<
    ProfileStepDto,
    ProfileStepDto,
    AsyncThunkConfig
>(`${sliceName}/profile-step`, (profileStepPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.completeProfileStep(profileStepPayload);
});

const completeSkillsStep = createAsyncThunk<
    SkillsStepDto,
    SkillsStepDto,
    AsyncThunkConfig
>(`${sliceName}/skills-step`, (skillsStepPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.completeSkillsStep(skillsStepPayload);
});

export { completeProfileStep, completeSkillsStep };
