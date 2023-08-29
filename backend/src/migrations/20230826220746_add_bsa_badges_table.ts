import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'bsa_badges_pkey';

const TABLE_NAME = 'bsa_badges';

const ColumnName = {
    ID: 'id',
    TYPE: 'type',
    NAME: 'name',
    MAX_SCORE: 'max_score',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });
        table.string(ColumnName.TYPE).unique().notNullable();
        table.string(ColumnName.NAME).notNullable();
        table.integer(ColumnName.MAX_SCORE).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
