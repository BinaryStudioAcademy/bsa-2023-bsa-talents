import { type Knex } from 'knex';

const TableName = {
    TALENT_HARD_SKILLS: 'talent_hard_skills',
} as const;

const ColumnName = {
    HARD_SKILL_ID: 'hard_skill_id',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName.TALENT_HARD_SKILLS, (table) => {
        table.dropUnique([ColumnName.HARD_SKILL_ID]);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.raw(`
  DELETE FROM ${TableName.TALENT_HARD_SKILLS}
  WHERE ${ColumnName.HARD_SKILL_ID} IN (
    SELECT ${ColumnName.HARD_SKILL_ID}
    FROM ${TableName.TALENT_HARD_SKILLS}
    GROUP BY ${ColumnName.HARD_SKILL_ID}
    HAVING COUNT(*) > 1
  )
`);

    return knex.schema.alterTable(TableName.TALENT_HARD_SKILLS, (table) => {
        table.unique([ColumnName.HARD_SKILL_ID]);
    });
}

export { down, up };
