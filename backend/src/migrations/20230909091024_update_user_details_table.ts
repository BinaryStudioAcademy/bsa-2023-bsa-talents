import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
    FULL_NAME: 'full_name',
    EXPERIENCE_YEARS: 'experience_years',
};

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.setNullable(ColumnName.FULL_NAME);
        table.decimal(ColumnName.EXPERIENCE_YEARS).alter();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.integer(ColumnName.EXPERIENCE_YEARS).alter();
    });
}

export { down, up };
