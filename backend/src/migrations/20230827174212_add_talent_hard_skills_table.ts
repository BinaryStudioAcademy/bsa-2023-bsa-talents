import { type Knex } from 'knex';

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
    return knex.schema.createTable(TableName.TALENT_HARD_SKILLS, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.HARD_SKILL_ID)
            .unique()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.HARD_SKILLS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .integer(ColumnName.USER_DETAILS_ID)
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
