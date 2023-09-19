import { type QueryBuilder } from 'objection';

import { UserDetailsModel } from '../user-details.model.js';

const searchUserByRelativeTable = ({
    builder,
    values,
    columnName,
    relativeTable,
    alias,
}: {
    builder: QueryBuilder<UserDetailsModel, UserDetailsModel[]>;
    columnName: string;
    relativeTable: string;
    values?: string[];
    alias?: string;
}): void => {
    if (values) {
        const relatedQuery = UserDetailsModel.relatedQuery(relativeTable);
        if (alias) {
            void builder.whereExists(
                relatedQuery.alias(alias).whereIn(columnName, values),
            );
        } else {
            void builder.whereExists(relatedQuery.whereIn(columnName, values));
        }
    }
};

export { searchUserByRelativeTable };
