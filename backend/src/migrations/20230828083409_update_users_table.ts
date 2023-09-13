import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'users_pkey';
const foreignTalentBadges = 'talent_badges_user_id_foreign';

const TABLE_NAME = 'users';
const TALENT_BADGES_TABLE_NAME = 'talent_badges';

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
};

const RelationRule = {
    CASCADE: 'CASCADE',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await knex.schema.table('talent_badges', (table) => {
        table.dropForeign(ColumnName.USER_ID, foreignTalentBadges);
    });

    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropPrimary();
        table.dropColumn(ColumnName.ID);
    });

    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.table(TALENT_BADGES_TABLE_NAME, (table) => {
        table.dropForeign(ColumnName.USER_ID);
    });

    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropPrimary(constraintName);
        table.dropColumn(ColumnName.ID);
    });

    await knex.schema.alterTable(TABLE_NAME, (table) => {
        table.increments(ColumnName.ID).primary();
    });

    await knex.schema.table(TALENT_BADGES_TABLE_NAME, (table) => {
        table
            .integer(ColumnName.USER_ID)
            .references(ColumnName.ID)
            .inTable(TABLE_NAME)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
    });
}

export { down, up };
