import { type Knex } from 'knex';

const TABLE_NAME = 'user_lms_data';

const ColumnName = {
    ENGLISH: 'english',
    TALENT: 'talent',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.json(ColumnName.TALENT);
        table.dropColumn(ColumnName.ENGLISH);
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.ENGLISH);
        table.dropColumn(ColumnName.TALENT);
    });
}

export { down, up };
