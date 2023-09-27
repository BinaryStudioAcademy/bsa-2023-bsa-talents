import { type QueryBuilder } from 'objection';

import { type Country, type ValueOf } from '../../../enums/enums.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchByColumnValues } from '../../search-by-column-values.js';

const applyLocationFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: ValueOf<typeof Country>[],
): void => {
    if (payload) {
        void builder.where((subquery) => {
            searchByColumnValues(subquery, 'location', payload);
        });
    }
};

export { applyLocationFilter };
