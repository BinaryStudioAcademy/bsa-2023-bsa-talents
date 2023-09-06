import { createAsyncThunk } from '@reduxjs/toolkit';
import { type UserDetailsUpdateRequestDto } from 'shared/build/index.js';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const updateTalentDetails = createAsyncThunk<
    UserDetailsUpdateRequestDto,
    UserDetailsUpdateRequestDto,
    AsyncThunkConfig
>(`${sliceName}/contacts-cv-step`, (registerPayload) => {
    return registerPayload;
});

export { updateTalentDetails };
