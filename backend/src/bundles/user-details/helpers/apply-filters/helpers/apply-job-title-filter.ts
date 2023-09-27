import { type QueryBuilder } from 'objection';

import { type JobTitle, type ValueOf } from '../../../enums/enums.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchByColumnValues } from '../../search-by-column-values.js';

const applyJobTitleFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: ValueOf<typeof JobTitle>[],
): void => {
    if (payload && payload.length > 0) {
        void builder.where((subquery) => {
            searchByColumnValues(subquery, 'jobTitle', payload);
        });
    }
};

export { applyJobTitleFilter };
