import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../types/types.js';
import { type UserDetailsModel } from '../../user-details.model.js';
import {
    applyEmploymentTypeFilter,
    applyEnglishLevelFilter,
    applyExperienceFilter,
    applyHardSkillsFilter,
    applyJobTitleFilter,
    applyLocationFilter,
    applyProfileNameFilter,
    applyTypeSearchFilter,
} from './helpers/filters.js';

const applyFilters = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    applyProfileNameFilter(builder, payload);

    applyTypeSearchFilter(builder, payload);

    applyJobTitleFilter(builder, payload);

    applyExperienceFilter(builder, payload);

    applyHardSkillsFilter(builder, payload);

    applyLocationFilter(builder, payload);

    applyEnglishLevelFilter(builder, payload);

    applyEmploymentTypeFilter(builder, payload);
};

export { applyFilters };
