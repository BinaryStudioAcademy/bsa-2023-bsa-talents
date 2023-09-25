import { type Knex } from 'knex';

const TABLE_NAME = 'files';

const OldColumnName = {
    ID: 'id',
    URL: 'url',
    FILE_NAME: 'name',
    CONTENT_TYPE: 'content_type',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const NewColumnName = {
    ID: 'id',
    URL: 'url',
    FILE_NAME: 'file_name',
    ETAG: 'etag',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(OldColumnName.CONTENT_TYPE);
        table.dropColumn(OldColumnName.FILE_NAME);
        table.string(NewColumnName.ETAG).notNullable();
        table.string(NewColumnName.FILE_NAME).notNullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.dropColumn(NewColumnName.ETAG);
        table.dropColumn(NewColumnName.FILE_NAME);
        table
            .string(OldColumnName.CONTENT_TYPE)
            .defaultTo('multipart/form-data');
        table.string(OldColumnName.FILE_NAME);
    });
}

export { down, up };
