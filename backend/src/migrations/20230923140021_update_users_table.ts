import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
    RESET_TOKEN: 'reset_token',
    RESET_TOKEN_EXPIRY: 'reset_token_expiry',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.string(ColumnName.RESET_TOKEN).unique().nullable();
        table.bigInteger(ColumnName.RESET_TOKEN_EXPIRY).nullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.RESET_TOKEN);
        table.dropColumn(ColumnName.RESET_TOKEN_EXPIRY);
    });
}

export { down, up };
