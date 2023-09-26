import { type Knex } from 'knex';

const TABLE_NAME = 'bsa_badges';

const ColumnName = {
    TYPE: 'type',
    MAX_SCORE: 'max_score',
} as const;

async function up(knex: Knex): Promise<void> {
    const result = await knex.raw(`
        SELECT 1
        FROM pg_constraint 
        WHERE conname = 'bsa_badges_type_unique'
    `);

    if (result.rows.length > 0) {
        await knex.schema.alterTable('bsa_badges', (table) => {
            table.dropUnique([ColumnName.TYPE]);
        });
    }

    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.integer(ColumnName.MAX_SCORE).nullable().alter();
    });
}

async function down(knex: Knex): Promise<void> {
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
    const result = await knex.raw(`
        SELECT 1
        FROM pg_constraint 
        WHERE conname = 'bsa_badges_type_unique'
    `);

    await knex(TABLE_NAME)
        .update({ [ColumnName.MAX_SCORE]: 0 })
        .whereNull(ColumnName.MAX_SCORE);

    if (result.rows.length === 0) {
        return knex.schema.alterTable(TABLE_NAME, (table) => {
            table.integer(ColumnName.MAX_SCORE).notNullable().alter();
        });
    }
}

export { down, up };
