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
    const {
        employmentType,
        englishLevel,
        hardSkills,
        jobTitle,
        location,
        searchStringType,
        searchType,
        searchValue,
        yearsOfExperience,
    } = payload;

    applyProfileNameFilter(builder, searchValue, searchStringType);

    applyTypeSearchFilter(builder, searchType);

    applyJobTitleFilter(builder, jobTitle);

    applyExperienceFilter(builder, yearsOfExperience);

    applyHardSkillsFilter(builder, hardSkills);

    applyLocationFilter(builder, location);

    applyEnglishLevelFilter(builder, englishLevel);

    applyEmploymentTypeFilter(builder, employmentType);
};

export { applyAllFilters };
