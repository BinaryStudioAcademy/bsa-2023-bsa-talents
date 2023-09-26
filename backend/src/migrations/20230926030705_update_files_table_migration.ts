import { type Knex } from 'knex';

const TABLE_NAME = 'files';

const OldColumnName = {
    CONTENT_TYPE: 'content_type',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table
            .string(OldColumnName.CONTENT_TYPE)
            .defaultTo('multipart/form-data')
            .alter();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.table(TABLE_NAME, (table) => {
        table.string(OldColumnName.CONTENT_TYPE).notNullable().alter();
    });
}

export { down, up };
