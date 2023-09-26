import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../../types/types.js';
import { type UserDetailsModel } from '../../../user-details.model.js';

const applyEmploymentTypeFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    if (payload.employmentType && payload.employmentType.length > 0) {
        void builder.whereRaw(
            `"employment_type" @> ARRAY[${payload.employmentType
                .map((type) => `'${type}'`)
                .join(', ')}]::text[]`,
        );
    }
};

export { applyEmploymentTypeFilter };
