import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'hiring_info_pkey';

const TableName = {
    HIRING_INFO: 'hiring_info',
    USER_DETAILS: 'user_details',
};

const STATUS = {
    NOT_STARTED: 'Not Started',
    STARTED: 'Started',
    IN_PROGRESS: 'In Progress',
    PAID: 'paid',
} as const;

const ColumnName = {
    ID: 'id',
    TALENT_ID: 'talent_id',
    COMPANY_ID: 'company_id',
    FIRST_CONTACT_TIME: 'first_contact_time',
    HAS_SHARED_INFO: 'has_shared_info',
    SHARED_INFO_TIME: 'shared_info_time',
    IS_HIRED: 'is_hired',
    HIRED_TIME: 'hired_time',
    HIRED_SALARY: 'hired_salary',
    HIRED_POSITION: 'hired_position',
    STATUS: 'status',
    FEE: 'fee',
    IS_APPROVED: 'is_approved',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

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
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });
        table
            .uuid(ColumnName.TALENT_ID)
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USER_DETAILS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .uuid(ColumnName.COMPANY_ID)
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USER_DETAILS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .timestamp(ColumnName.FIRST_CONTACT_TIME)
            .notNullable()
            .defaultTo(knex.fn.now());
        table.boolean(ColumnName.HAS_SHARED_INFO).defaultTo(false);
        table.timestamp(ColumnName.SHARED_INFO_TIME).nullable().defaultTo(null);
        table.boolean(ColumnName.IS_HIRED).defaultTo(false);
        table.timestamp(ColumnName.HIRED_TIME).nullable().defaultTo(null);
        table.integer(ColumnName.HIRED_SALARY);
        table.string(ColumnName.HIRED_POSITION);
        table.enum(ColumnName.STATUS, Object.values(STATUS));
        table.integer(ColumnName.FEE);
        table.boolean(ColumnName.IS_APPROVED).defaultTo(false);
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
