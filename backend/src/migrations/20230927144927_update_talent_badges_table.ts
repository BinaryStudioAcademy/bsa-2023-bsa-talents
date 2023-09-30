import { type Knex } from 'knex';

const TABLE_NAME = 'talent_badges';

const ColumnName = {
    score: 'score',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.table(TABLE_NAME).truncate();

    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.float(ColumnName.score).alter();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.integer(ColumnName.score).alter();
    });
}

export { down, up };
