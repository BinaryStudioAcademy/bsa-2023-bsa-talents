import { type Knex } from 'knex';

async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('user_details', (table) => {
        table.boolean('is_published').defaultTo(false);
    });
}

async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('user_details', (table) => {
        table.dropColumn('is_published');
    });
}
export { down, up };
