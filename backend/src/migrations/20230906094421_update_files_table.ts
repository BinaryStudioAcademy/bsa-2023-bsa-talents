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
        table.dropColumn(ColumnName.OLD_FILE_NAME);
        table.string(ColumnName.NEW_FILE_NAME).notNullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.NEW_FILE_NAME);
        table.string(ColumnName.OLD_FILE_NAME).notNullable();
    });
}

export { down, up };
