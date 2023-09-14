import { type QueryBuilder } from 'objection';

import { type UserDetailsModel } from '../user-details.model.js';

const searchByColumnValues = (
    subquery: QueryBuilder<UserDetailsModel, UserDetailsModel[]>,
    values: string[] | undefined,
    columnName: string,
): void => {
    if (values) {
        void subquery.where((subquery) => {
            for (const value of values) {
                void subquery.orWhere(columnName, value);
            }
        });
    }
};

export { searchByColumnValues };
