import { type QueryBuilder } from 'objection';

import { type ValueOf } from '../../../enums/enums.js';
import { SearchType } from '../../../enums/enums.js';
import { type UserDetailsModel } from '../../../user-details.model.js';

const applyTypeSearchFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: ValueOf<typeof SearchType>,
): void => {
    if (payload && payload === SearchType.ACTIVE) {
        void builder.where('searchType', payload);
    }
};

export { applyTypeSearchFilter };
