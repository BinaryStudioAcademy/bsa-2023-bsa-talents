import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type UserDetailsCreateRequestDto,
    type UserDetailsResponseDto,
    type UserDetailsUpdateDto,
    type UserDetailsUpdateRequestDto,
} from '~/bundles/talent/types/types';

import { name as sliceName } from './slice';

const createTalentDetails = createAsyncThunk<
    UserDetailsResponseDto,
    UserDetailsCreateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/onboarding`, (onboardingPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.completeTalentDetails(onboardingPayload);
});

const updateOnboardingData = createAsyncThunk<
    UserDetailsUpdateDto,
    UserDetailsUpdateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/onboarding`, (stepPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.completeOnboardingStep(stepPayload);
});

export { createTalentDetails, updateOnboardingData };
