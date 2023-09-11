import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
    FULL_NAME: 'full_name',
    EXPERIENCE_YEARS: 'experience_years',
    CURRENT_STEP: 'current_step',
};

const CurrentStep = {
    STEP_1: 'profile',
    STEP_2: 'bsa-badges',
    STEP_3: 'skills-and-projects',
    STEP_4: 'cv-and-contacts',
    STEP_5: 'preview',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.FULL_NAME).nullable().alter();
        table.decimal(ColumnName.EXPERIENCE_YEARS).alter();
        table.enum(ColumnName.CURRENT_STEP, Object.values(CurrentStep));
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.string(ColumnName.FULL_NAME).notNullable().alter();
        table.integer(ColumnName.EXPERIENCE_YEARS).alter();
        table.dropColumn(ColumnName.CURRENT_STEP);
    });
}

export { down, up };
