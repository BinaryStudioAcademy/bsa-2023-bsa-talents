import { type Knex } from 'knex';

const TABLE_NAME = 'user_lms_data';

const ColumnName = {
    ENGLISH: 'english',
    TALENT: 'talent',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.json(ColumnName.ENGLISH).alter();
        table.renameColumn(ColumnName.ENGLISH, ColumnName.TALENT);
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.TALENT).alter();
        table.renameColumn(ColumnName.TALENT, ColumnName.ENGLISH);
    });
}

export { down, up };
