import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';
const ColumnName = {
    PUBLISHED_AT: 'published_at',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.timestamp(ColumnName.PUBLISHED_AT).nullable().defaultTo(null);
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.PUBLISHED_AT);
    });
}

export { down, up };
