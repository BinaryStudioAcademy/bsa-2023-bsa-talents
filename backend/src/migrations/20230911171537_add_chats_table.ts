import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'chats_pkey';

const TableName = {
    CHATS: 'chats',
    USERS: 'users',
};

const ColumnName = {
    ID: 'id',
    OWNER_ID: 'owner_id',
    PARTICIPANT_ID: 'participant_id',
    NAME: 'name',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TableName.CHATS, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });

        table
            .uuid(ColumnName.OWNER_ID)
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);

        table
            .uuid(ColumnName.PARTICIPANT_ID)
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);

        table.text(ColumnName.NAME).notNullable();

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
    return knex.schema.dropTable(TableName.CHATS);
}

export { down, up };
