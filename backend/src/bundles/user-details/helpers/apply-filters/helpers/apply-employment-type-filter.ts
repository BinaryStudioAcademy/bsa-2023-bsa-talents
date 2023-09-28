import { type QueryBuilder } from 'objection';

import { type EmploymentType, type ValueOf } from '../../../enums/enums.js';
import { type UserDetailsModel } from '../../../user-details.model.js';

const applyEmploymentTypeFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: ValueOf<typeof EmploymentType>[],
): void => {
    if (payload && payload.length > 0) {
        void builder.whereRaw(
            `"employment_type" @> ARRAY[${payload
                .map((type) => `'${type}'`)
                .join(', ')}]::text[]`,
        );
    }
};

export { applyEmploymentTypeFilter };
