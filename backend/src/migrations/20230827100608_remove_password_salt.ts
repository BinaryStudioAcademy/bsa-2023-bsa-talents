import { type Knex } from 'knex';

const TABLE_NAME = 'users';

function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, function (table) {
        table.dropColumn('password_salt');
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, function (table) {
        table.string('password_salt');
    });
}

export { down, up };
