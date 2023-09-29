import { type Knex } from 'knex';

const TABLE_NAME = 'user_lms_data';

const ColumnName = {
    ENGLISH: 'english',
    TALENT: 'talent',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.renameColumn(ColumnName.ENGLISH, ColumnName.TALENT);
        table.json(ColumnName.TALENT).alter();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.renameColumn(ColumnName.TALENT, ColumnName.ENGLISH);
        table.string(ColumnName.TALENT).alter();
    });
}

export { down, up };
