import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../../types/types.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchUserByRelativeTable } from '../../search-user-by-relative-table.js';

const applyHardSkillsFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    if (payload.hardSkills && payload.hardSkills.length > 0) {
        searchUserByRelativeTable({
            builder,
            values: payload.hardSkills,
            columnName: 'hard_skill_id',
            relativeTable: 'talentHardSkills',
            alias: 'ths',
        });
    }
};

export { applyHardSkillsFilter };
