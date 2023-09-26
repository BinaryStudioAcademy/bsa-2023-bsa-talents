import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../../types/types.js';
import { type UserDetailsModel } from '../../../user-details.model.js';

const applyTypeSearchFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    if (payload.searchType) {
        void builder.where('searchType', payload.searchType);
    }
};

export { applyTypeSearchFilter };
