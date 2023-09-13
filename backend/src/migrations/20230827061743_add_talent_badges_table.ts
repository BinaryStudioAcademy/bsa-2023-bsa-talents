import { type Knex } from 'knex';

const uuid = 'uuid_generate_v4()';
const constraintName = 'talent_badges_pkey';

const TableName = {
    TALENT_BADGES: 'talent_badges',
    BSA_BADGES: 'bsa_badges',
    USERS: 'users',
};

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    BADGE_ID: 'badge_id',
    USER_DETAILS_ID: 'user_details_id',
    SCORE: 'score',
    LEVEL: 'level',
    IS_SHOWN: 'is_shown',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

const RelationRule = {
    CASCADE: 'CASCADE',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TableName.TALENT_BADGES, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(uuid))
            .primary({ constraintName });
        table.integer(ColumnName.SCORE);
        table.string(ColumnName.LEVEL);
        table.boolean(ColumnName.IS_SHOWN).notNullable();
        table
            .integer(ColumnName.USER_ID)
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table
            .uuid(ColumnName.BADGE_ID)
            .references(ColumnName.ID)
            .inTable(TableName.BSA_BADGES)
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
    return knex.schema.dropTableIfExists(TableName.TALENT_BADGES);
}

export { down, up };
