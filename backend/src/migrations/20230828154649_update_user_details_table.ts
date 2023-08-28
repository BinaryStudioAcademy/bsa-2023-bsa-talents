import { type Knex } from 'knex';

import { CurrencyType } from '~/common/enums/enums.js';

const TABLE_NAME = 'users';

const ColumnName = {
    SALARY_EXPECTATION_TYPE: 'salary_expectation_type',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.enum(
            ColumnName.SALARY_EXPECTATION_TYPE,
            Object.values(CurrencyType),
        );
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.SALARY_EXPECTATION_TYPE);
    });
}

export { down, up };
