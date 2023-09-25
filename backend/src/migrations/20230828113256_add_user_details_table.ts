import { type Knex } from 'knex';

const UUID = 'uuid_generate_v4()';
const CONTRAINT_NAME = 'user_details_pkey';

const TableName = {
    USERS: 'users',
    USER_DETAILS: 'user_details',
    FILES: 'files',
} as const;

const ColumnName = {
    ID: 'id',
    USER_ID: 'user_id',
    IS_APPROVED: 'is_approved',
    DENIED_REASON: 'denied_reason',
    IS_HIRED: 'is_hired',
    PROFILE_NAME: 'profile_name',
    SALARY_EXPECTATION: 'salary_expectation',
    HIRED_SALARY: 'hired_salary',
    JOB_TITLE: 'job_title',
    LOCATION: 'location',
    EXPERIENCE_YEARS: 'experience_years',
    EMPLOYMENT_TYPE: 'employment_type',
    DESCRIPTION: 'description',
    ENGLISH_LEVEL: 'english_level',
    NOT_CONSIDERED: 'not_considered',
    PREFERRED_LANGUAGES: 'preferred_languages',
    PROJECT_LINKS: 'project_links',
    PHOTO_ID: 'photo_id',
    FULL_NAME: 'full_name',
    PHONE: 'phone',
    LINKEDIN_LINK: 'linkedin_link',
    COMPANY_NAME: 'company_name',
    COMPANY_LOGO_ID: 'company_logo_id',
    COMPANY_WEBSITE: 'company_website',
    EMPOYER_POSITION: 'employer_position',
    CV_ID: 'cv_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
    CASCADE: 'CASCADE',
    SET_NULL: 'SET NULL',
} as const;

async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable(TableName.USER_DETAILS, (table) => {
        table
            .uuid(ColumnName.ID)
            .unique()
            .notNullable()
            .defaultTo(knex.raw(UUID))
            .primary({ constraintName: CONTRAINT_NAME });
        table
            .uuid(ColumnName.USER_ID)
            .unique()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(TableName.USERS)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.CASCADE);
        table.boolean(ColumnName.IS_APPROVED).defaultTo(false);
        table.string(ColumnName.DENIED_REASON);
        table.boolean(ColumnName.IS_HIRED).defaultTo(false);
        table.string(ColumnName.PROFILE_NAME);
        table.integer(ColumnName.SALARY_EXPECTATION);
        table.integer(ColumnName.HIRED_SALARY);
        table.string(ColumnName.JOB_TITLE);
        table.string(ColumnName.LOCATION);
        table.integer(ColumnName.EXPERIENCE_YEARS);
        table.specificType(ColumnName.EMPLOYMENT_TYPE, 'text[]');
        table.text(ColumnName.DESCRIPTION);
        table.string(ColumnName.ENGLISH_LEVEL);
        table.specificType(ColumnName.NOT_CONSIDERED, 'text[]');
        table.specificType(ColumnName.PREFERRED_LANGUAGES, 'text[]');
        table.specificType(ColumnName.PROJECT_LINKS, 'text[]');
        table
            .uuid(ColumnName.PHOTO_ID)
            .references(ColumnName.ID)
            .inTable(TableName.FILES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
        table.string(ColumnName.FULL_NAME).notNullable();
        table.string(ColumnName.PHONE);
        table.string(ColumnName.LINKEDIN_LINK);
        table.string(ColumnName.COMPANY_NAME);
        table
            .uuid(ColumnName.COMPANY_LOGO_ID)
            .references(ColumnName.ID)
            .inTable(TableName.FILES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
        table.string(ColumnName.COMPANY_WEBSITE);
        table.string(ColumnName.EMPOYER_POSITION);
        table
            .uuid(ColumnName.CV_ID)
            .references(ColumnName.ID)
            .inTable(TableName.FILES)
            .onUpdate(RelationRule.CASCADE)
            .onDelete(RelationRule.SET_NULL);
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
    return knex.schema.dropTableIfExists(TableName.USER_DETAILS);
}

export { down, up };
