import { type Knex } from 'knex';

const UUID = 'uuid_generate_v4()';
const CONTRAINT_NAME = 'files_pkey';

const TABLE_NAME = 'files';

const ColumnName = {
    ID: 'id',
    URL: 'url',
    FILE_NAME: 'name',
    CONTENT_TYPE: 'content_type',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(UUID))
            .primary({ constraintName: CONTRAINT_NAME });
        table.string(ColumnName.URL).notNullable();
        table.string(ColumnName.FILE_NAME);
        table.string(ColumnName.CONTENT_TYPE).notNullable();
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
