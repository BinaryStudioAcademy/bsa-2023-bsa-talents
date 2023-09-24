import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'user_details_pkey';

const TableName = {
    USERS: 'users',
    USER_DETAILS: 'user_details',
};
const TABLE_NAME = 'user_lms_data';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    ENGLISH: 'english',
    AVERAGE_PROJECT_SCORE: 'average_project_score',
    AVERAGE_LECTURE_SCORE: 'average_lecture_score',
    LECTURE_DETAILS: 'lecture_details',
    PROJECT_COACHES_FEEDBACK: 'project_coaches_feedback',
    HR_FEEDBACK: 'hr_feedback',
    PROJECT: 'project',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const ForeignColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
};

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
} as const;

const FloatNumber = {
    PRESISION: 4,
    SCALE: 2,
};

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });
        table
            .uuid(ColumnName.USER_ID)
            .unique()
            .notNullable()
            .references(ForeignColumnName.ID)
            .inTable(TableName.USERS)
            .references(ForeignColumnName.USER_ID)
            .inTable(TableName.USER_DETAILS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table.string(ColumnName.ENGLISH);
        table.float(
            ColumnName.AVERAGE_PROJECT_SCORE,
            FloatNumber.PRESISION,
            FloatNumber.SCALE,
        );
        table.float(
            ColumnName.AVERAGE_LECTURE_SCORE,
            FloatNumber.PRESISION,
            FloatNumber.SCALE,
        );
        table.json(ColumnName.LECTURE_DETAILS);
        table.json(ColumnName.PROJECT_COACHES_FEEDBACK);
        table.json(ColumnName.HR_FEEDBACK);
        table.json(ColumnName.PROJECT);
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
    return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
