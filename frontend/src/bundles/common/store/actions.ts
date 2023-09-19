import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { ApiPath } from '../enums/enums.js';
import { type HardSkills } from '../types/hard-skills.type.js';
import { name as sliceName } from './slice.js';

const getHardSkills = createAsyncThunk<HardSkills, undefined, AsyncThunkConfig>(
    `${sliceName}${ApiPath.HARD_SKILLS}`,
    async (_, { extra }) => {
        const { hardSkillsApi } = extra;

        return await hardSkillsApi.getAllHardSkills();
    },
);

export { getHardSkills };
