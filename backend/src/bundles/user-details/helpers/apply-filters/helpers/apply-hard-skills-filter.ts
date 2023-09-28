import { type QueryBuilder } from 'objection';

import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchUserByRelativeTable } from '../../search-user-by-relative-table.js';

const applyHardSkillsFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: string[],
): void => {
    if (payload && payload.length > 0) {
        searchUserByRelativeTable({
            builder,
            values: payload,
            columnName: 'hard_skill_id',
            relativeTable: 'talentHardSkills',
            alias: 'ths',
        });
    }
};

export { applyHardSkillsFilter };
