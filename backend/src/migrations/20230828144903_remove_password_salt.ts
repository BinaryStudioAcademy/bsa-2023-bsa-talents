import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
    PASSWORD_SALT: 'password_salt',
} as const;

function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, function (table) {
        table.dropColumn(ColumnName.PASSWORD_SALT);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, function (table) {
        table.string(ColumnName.PASSWORD_SALT);
    });
}

export { down, up };
