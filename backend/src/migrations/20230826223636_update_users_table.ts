import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
    ROLE: 'role',
};

const UserRole = {
    TALENT: 'talent',
    EMPLOYER: 'employer',
    ADMIN: 'admin',
} as const;

async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.enum(ColumnName.ROLE, Object.values(UserRole)).notNullable();
    });
}

async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLE_NAME, (table) => {
        table.dropColumn(ColumnName.ROLE);
    });
}

export { down, up };
