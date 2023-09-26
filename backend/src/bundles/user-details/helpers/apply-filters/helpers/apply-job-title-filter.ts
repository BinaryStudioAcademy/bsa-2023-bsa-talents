import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../../types/types.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchByColumnValues } from '../../search-by-column-values.js';

const applyJobTitleFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    if (payload.jobTitle && payload.jobTitle.length > 0) {
        void builder.where((subquery) => {
            searchByColumnValues(subquery, 'jobTitle', payload.jobTitle);
        });
    }
};

export { applyJobTitleFilter };
