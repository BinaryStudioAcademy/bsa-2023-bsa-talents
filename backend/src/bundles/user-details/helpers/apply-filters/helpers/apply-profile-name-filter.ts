import { type QueryBuilder } from 'objection';

import { type UserDetailsModel } from '../../../user-details.model.js';

const applyProfileNameFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: string,
    searchStringType?: string,
): void => {
    if (payload && searchStringType === 'Basic search') {
        void builder.where('profile_name', 'ilike', `%${payload}%`);
    }
};

export { applyProfileNameFilter };
