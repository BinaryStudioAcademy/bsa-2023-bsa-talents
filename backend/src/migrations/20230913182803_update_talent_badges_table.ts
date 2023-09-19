import { type Knex } from 'knex';

const TableName = {
    TALENT_BADGES: 'talent_badges',
    USERS: 'users',
};

const ColumnName = {
    ID: 'id',
    USER_EMAIL: 'user_email',
    USER_ID: 'user_id',
};

const RelationRule = {
    CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName.TALENT_BADGES, (table) => {
        table.dropColumn(ColumnName.USER_EMAIL);
        table
            .uuid(ColumnName.USER_ID)
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName.TALENT_BADGES, (table) => {
        table.dropColumn(ColumnName.USER_ID);
        table.string(ColumnName.USER_EMAIL).unique().notNullable();
    });
}

export { down, up };
