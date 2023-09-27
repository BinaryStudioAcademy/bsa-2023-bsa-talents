import { type QueryBuilder } from 'objection';

import { type UserDetailsModel } from '../../../user-details.model.js';

const applyProfileNameFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: string,
): void => {
    if (payload) {
        void builder.where('profile_name', 'ilike', `%${payload}%`);
    }
};

export { applyProfileNameFilter };
