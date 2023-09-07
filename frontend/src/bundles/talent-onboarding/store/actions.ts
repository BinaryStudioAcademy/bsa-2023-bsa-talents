import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type UserDetailsGeneralCustom } from '../types/types.js';
import { name as sliceName } from './slice.js';

const updateTalentDetails = createAsyncThunk<
    UserDetailsGeneralCustom,
    UserDetailsGeneralCustom,
    AsyncThunkConfig
>(`${sliceName}/contacts-cv-step`, (registerPayload) => {
    return registerPayload;
});

export { updateTalentDetails };
