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

const applyAllFilters = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    applyProfileNameFilter(builder, payload.searchValue);

    applyTypeSearchFilter(builder, payload.searchType);

    applyJobTitleFilter(builder, payload.jobTitle);

    applyExperienceFilter(builder, payload.yearsOfExperience);

    applyHardSkillsFilter(builder, payload.hardSkills);

    applyLocationFilter(builder, payload.location);

    applyEnglishLevelFilter(builder, payload.englishLevel);

    applyEmploymentTypeFilter(builder, payload.employmentType);
};

export { applyAllFilters };
