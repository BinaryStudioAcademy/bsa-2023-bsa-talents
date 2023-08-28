import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'talent_hard_skills_pkey';

const TableName = {
    USER_DETAILS: 'user_details',
    TALENT_HARD_SKILLS: 'talent_hard_skills',
    HARD_SKILLS: 'hard_skills',
};

const ColumnName = {
    ID: 'id',
    HARD_SKILL_ID: 'hard_skill_id',
    USER_DETAILS_ID: 'user_details_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const RelationRule = {
    CASCADE: 'CASCADE',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TableName.TALENT_HARD_SKILLS, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });
        table
            .uuid(ColumnName.HARD_SKILL_ID)
            .unique()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.HARD_SKILLS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .uuid(ColumnName.USER_DETAILS_ID)
            .references(ColumnName.ID)
            .inTable(TableName.USER_DETAILS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TableName.TALENT_HARD_SKILLS);
}

export { down, up };
