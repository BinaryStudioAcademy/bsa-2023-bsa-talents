import { type QueryBuilder } from 'objection';

import { type UserDetailsSearchUsersRequestDto } from '../../../types/types.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchByColumnValues } from '../../search-by-column-values.js';

const applyEnglishLevelFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload: UserDetailsSearchUsersRequestDto,
): void => {
    if (payload.englishLevel) {
        void builder.where((subquery) => {
            searchByColumnValues(
                subquery,
                'englishLevel',
                payload.englishLevel,
            );
        });
    }
};

export { applyEnglishLevelFilter };
