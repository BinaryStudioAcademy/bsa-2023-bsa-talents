import { createAsyncThunk } from '@reduxjs/toolkit';

import { type HardSkillsResponseDto } from '~/bundles/common/data/types/types.js';
import { ApiPath } from '~/bundles/common/enums/enums.js';
import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { name as sliceName } from './slice.js';

const getHardSkillsData = createAsyncThunk<
    HardSkillsResponseDto,
    undefined,
    AsyncThunkConfig
>(`${sliceName}${ApiPath.HARD_SKILLS}`, (_, { extra }) => {
    const { hardSkillsApi } = extra;

    return hardSkillsApi.getAllHardSkills();
});

export { getHardSkillsData };
