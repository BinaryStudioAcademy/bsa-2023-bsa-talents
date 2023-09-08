import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type CvAndContactsFormDto,
    type ProfileStepDto,
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

const contactsCVStep = createAsyncThunk<
    CvAndContactsFormDto,
    CvAndContactsFormDto,
    AsyncThunkConfig
>(`${sliceName}/contacts-cv-step`, (contactsCVStepPayload) => {
    return contactsCVStepPayload;
});

export { completeProfileStep, contactsCVStep };
