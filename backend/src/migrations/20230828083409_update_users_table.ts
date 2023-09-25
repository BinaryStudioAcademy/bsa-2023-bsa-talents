import { type Knex } from 'knex';

const UUID = 'uuid_generate_v4()';
const CONTRAINT_NAME = 'users_pkey';

const TABLE_NAME = 'users';

const ColumnName = {
    ID: 'id',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropPrimary();
        table.dropColumn(ColumnName.ID);
    });

    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(UUID))
            .primary({ constraintName: CONTRAINT_NAME });
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropPrimary(CONTRAINT_NAME);
        table.dropColumn(ColumnName.ID);
    });

    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
    });
}

export { down, up };
