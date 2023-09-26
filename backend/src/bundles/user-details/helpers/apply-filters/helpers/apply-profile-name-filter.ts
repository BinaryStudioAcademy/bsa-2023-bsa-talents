import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../../types/types.js';
import { type UserDetailsModel } from '../../../user-details.model.js';

const applyProfileNameFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    if (payload.searchValue) {
        void builder.where('profile_name', 'ilike', `%${payload.searchValue}%`);
    }
};

export { applyProfileNameFilter };
