import { type Knex } from 'knex';

const TableName = {
    USER_DETAILS: 'user_details',
    TALENT_BADGES: 'talent_badges',
};

const ColumnName = {
    ID: 'id',
    USER_DETAILS_ID: 'user_details_id',
};

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName.TALENT_BADGES, (table) => {
        table
            .integer(ColumnName.USER_DETAILS_ID)
            .references(ColumnName.ID)
            .inTable(TableName.USER_DETAILS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName.TALENT_BADGES, (table) => {
        table.dropColumn(ColumnName.USER_DETAILS_ID);
    });
}

export { down, up };
