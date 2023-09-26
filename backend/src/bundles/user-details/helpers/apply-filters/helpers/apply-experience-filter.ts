import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../../types/types.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchByYearsOfExperience } from '../../search-by-years-of-experience.js';

const applyExperienceFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    if (payload.yearsOfExperience) {
        void builder.where((subquery) => {
            searchByYearsOfExperience(subquery, payload.yearsOfExperience);
        });
    }
};

export { applyExperienceFilter };
