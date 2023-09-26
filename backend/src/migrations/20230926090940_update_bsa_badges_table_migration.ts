import { type Knex } from 'knex';

const TABLE_NAME = 'bsa_badges';

const ColumnName = {
    TYPE: 'type',
    MAX_SCORE: 'max_score',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    DELETE FROM ${TABLE_NAME}
    WHERE (id, ${ColumnName.TYPE}) NOT IN (
        SELECT id, ${ColumnName.TYPE}
        FROM (
            SELECT DISTINCT ON (${ColumnName.TYPE}) id, ${ColumnName.TYPE}
            FROM ${TABLE_NAME}
            ORDER BY ${ColumnName.TYPE}, id
        ) AS subquery
    );
    `);

    await knex(TABLE_NAME)
        .update({ [ColumnName.MAX_SCORE]: 0 })
        .whereNull(ColumnName.MAX_SCORE);

    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.TYPE).unique().alter();
        table.integer(ColumnName.MAX_SCORE).notNullable().alter();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropUnique([ColumnName.TYPE]);
        table.integer(ColumnName.MAX_SCORE).nullable().alter();
    });
}

export { down, up };
