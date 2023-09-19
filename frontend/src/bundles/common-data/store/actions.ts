import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiPath } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type HardSkillsResponseDto } from '../types/types.js';
import { name as sliceName } from './slice.js';

const getHardSkillsData = createAsyncThunk<
    HardSkillsResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.HARD_SKILLS}`, async (_, { extra }) => {
    const { commonDataApi } = extra;

    return await commonDataApi.getAllHardSkills();
});

export { getHardSkillsData };
