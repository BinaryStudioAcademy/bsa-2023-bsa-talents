import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types';
import {
    type ProfileStepDto,
    type UserDetailsResponseDto,
} from '~/bundles/talent/types/types';

import { name as sliceName } from './slice';

const completeProfileStep = createAsyncThunk<
    UserDetailsResponseDto,
    ProfileStepDto,
    AsyncThunkConfig
>(`${sliceName}/profile-step`, (profileStepPayload, { extra }) => {
    const { talentApi } = extra;
    return talentApi.completeProfileStep(profileStepPayload);
});

export { completeProfileStep };
