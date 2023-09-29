import { type QueryBuilder } from 'objection';

import { type EnglishLevel, type ValueOf } from '../../../enums/enums.js';
import { type UserDetailsModel } from '../../../user-details.model.js';
import { searchByColumnValues } from '../../search-by-column-values.js';

const applyEnglishLevelFilter = (
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    payload?: ValueOf<typeof EnglishLevel>[],
): void => {
    if (payload) {
        void builder.where((subquery) => {
            searchByColumnValues(subquery, 'englishLevel', payload);
        });
    }
};

export { applyEnglishLevelFilter };
