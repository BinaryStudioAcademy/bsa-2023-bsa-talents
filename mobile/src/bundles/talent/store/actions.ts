import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type BadgeStepDto,
    type CvAndContactsFormDto,
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

const completeBadgesStep = createAsyncThunk<
    BadgeStepDto,
    BadgeStepDto,
    AsyncThunkConfig
>(`${sliceName}/badges`, (profileStepPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.completeBadgesStep(profileStepPayload);
});
const contactsCVStep = createAsyncThunk<
    CvAndContactsFormDto,
    CvAndContactsFormDto,
    AsyncThunkConfig
>(`${sliceName}/contacts-cv-step`, (contactsCVStepPayload) => {
    return contactsCVStepPayload;
});

const completeSkillsStep = createAsyncThunk<
    SkillsStepDto,
    SkillsStepDto,
    AsyncThunkConfig
>(`${sliceName}/skills-step`, (skillsStepPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.completeSkillsStep(skillsStepPayload);
});

export {
    completeBadgesStep,
    completeProfileStep,
    completeSkillsStep,
    contactsCVStep,
};
