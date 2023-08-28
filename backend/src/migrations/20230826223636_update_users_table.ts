import { type Knex } from 'knex';

import { UserRole } from '~/common/enums/enums.js';

const TABLE_NAME = 'users';

const ColumnName = {
    ROLE: 'role',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.enum(ColumnName.ROLE, Object.values(UserRole)).notNullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.ROLE);
    });
}

export { down, up };
