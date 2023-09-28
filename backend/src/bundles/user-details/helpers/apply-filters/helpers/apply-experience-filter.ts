import { type QueryBuilder } from 'objection';

import { type ValueOf, type YearsOfExperience } from '../../../enums/enums.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchByYearsOfExperience } from '../../search-by-years-of-experience.js';

const applyExperienceFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: ValueOf<typeof YearsOfExperience>[],
): void => {
    if (payload) {
        void builder.where((subquery) => {
            searchByYearsOfExperience(subquery, payload);
        });
    }
};

export { applyExperienceFilter };
