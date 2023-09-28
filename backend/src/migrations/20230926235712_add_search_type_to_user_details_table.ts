import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
    SEARCH_TYPE: 'search_type',
} as const;

const SearchType = {
    ACTIVE: 'active',
    PASSIVE: 'passive',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table
            .enum(ColumnName.SEARCH_TYPE, Object.values(SearchType))
            .notNullable()
            .defaultTo(SearchType.ACTIVE);
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.SEARCH_TYPE);
    });
}

export { down, up };
