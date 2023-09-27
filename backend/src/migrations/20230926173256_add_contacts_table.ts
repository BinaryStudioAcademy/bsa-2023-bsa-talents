import { type Knex } from 'knex';

const UUID = 'uuid_generate_v4()';
const CONTRAINT_NAME = 'contacts_pkey';

const TableName = {
    CONTACTS: 'contacts',
    USER_DETAILS: 'user_details',
} as const;

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    TALENT_ID: 'talent_id',
    COMPANY_ID: 'company_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TableName.CONTACTS, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(UUID))
            .primary({ constraintName: CONTRAINT_NAME });
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
    return knex.schema.dropTableIfExists(TableName.CONTACTS);
}

export { down, up };
