import { type Knex } from 'knex';

const UUID = 'uuid_generate_v4()';
const CONTRAINT_NAME = 'hiring_info_pkey';

const TableName = {
    HIRING_INFO: 'hiring_info',
    USER_DETAILS: 'user_details',
} as const;

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    TALENT_ID: 'talent_id',
    COMPANY_ID: 'company_id',
    HIRED_TIME: 'hired_time',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TableName.HIRING_INFO, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(UUID))
            .primary(CONTRAINT_NAME);
        table
            .uuid(ColumnName.TALENT_ID)
            .notNullable()
            .references(ColumnName.USER_ID)
            .inTable(TableName.USER_DETAILS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .uuid(ColumnName.COMPANY_ID)
            .notNullable()
            .references(ColumnName.USER_ID)
            .inTable(TableName.USER_DETAILS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .timestamp(ColumnName.HIRED_TIME)
            .notNullable()
            .defaultTo(knex.fn.now());
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
    return knex.schema.dropTableIfExists(TableName.HIRING_INFO);
}

export { down, up };
