import { type Knex } from 'knex';

const TABLE_NAME = 'files';

const ColumnName = {
    ID: 'id',
    URL: 'url',
    FILE_NAME: 'name',
    CONTENT_TYPE: 'content_type',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    E_TAG: 'etag',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.CONTENT_TYPE);
        table.string(ColumnName.E_TAG).notNullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.E_TAG);
        table.string(ColumnName.CONTENT_TYPE).notNullable();
    });
}

export { down, up };
