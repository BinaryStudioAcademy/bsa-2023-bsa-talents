import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'chat_messages_pkey';

const TableName = {
    CHAT_MESSAGES: 'chat_messages',
    USERS: 'users',
};

const ColumnName = {
    ID: 'id',
    SENDER_ID: 'sender_id',
    RECEIVER_ID: 'receiver_id',
    CHAT_ID: 'chat_id',
    MESSAGE: 'message',
    IS_READ: 'is_read',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TableName.CHAT_MESSAGES, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });

        table
            .uuid(ColumnName.SENDER_ID)
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);

        table
            .uuid(ColumnName.RECEIVER_ID)
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);

        table.uuid(ColumnName.CHAT_ID).notNullable().defaultTo(knex.raw(uuid));

        table.text(ColumnName.MESSAGE).notNullable();

        table.boolean(ColumnName.IS_READ).notNullable().defaultTo(false);

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
    return knex.schema.dropTable(TableName.CHAT_MESSAGES);
}

export { down, up };
