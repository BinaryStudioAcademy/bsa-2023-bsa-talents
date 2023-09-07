import { type Knex } from 'knex';

const TABLE_NAME = 'files';

const ColumnName = {
    ID: 'id',
    URL: 'url',
    NEW_FILE_NAME: 'file_name',
    OLD_FILE_NAME: 'name',
    CONTENT_TYPE: 'content_type',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    E_TAG: 'etag',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.CREATED_AT);
        table.dropColumn(ColumnName.UPDATED_AT);
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
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

export { down, up };
