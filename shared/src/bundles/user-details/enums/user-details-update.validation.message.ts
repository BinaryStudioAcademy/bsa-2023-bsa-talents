const UserDetailsValidationMessage = {
    PROFILE_NAME_NOT_STRING: 'Profile name must be a string',
    PROFILE_NAME_MIN_LENGTH:
        'Profile name must be at least {{#limit}} characters',
    PROFILE_NAME_MAX_LENGTH:
        'Profile name must be at most {{#limit}} characters',
    PROFILE_NAME_WRONG_PATTERN:
        'Profile name must contain only letters, spaces, (.) and (-)',
    SALARY_EXPECTATION_NOT_NUMBER: 'Salary expectations must be a number',
    SALARY_EXPECTATION_MIN_VALUE:
        'Salary expectations must be at least {{#limit}} ',
    SALARY_EXPECTATION_MAX_VALUE:
        'Salary expectations must be at most {{#limit}} ',
    JOB_TITLE_NOT_STRING: 'Job title must be a string',
    JOB_TITLE_LENGTH:
        'Job title must be between {{#limit.min}} and {{#limit.max}} characters',
    JOB_TITLE_BASE: 'Please select a valid job title from the provided options',
    JOB_TITLE_WRONG_PATTERN: 'Job title must contain only letters and spaces',
    EXPERIENCE_YEARS_NOT_NUMBER: 'Experience years must be a number',
    LOCATION_NOT_STRING: 'Location must be a string',
    LOCATION_BASE: 'Please select a valid location from the provided options',
    EMPLOYMENT_TYPES_BASE:
        'Please select valid employment types from the provided options',
    DESCRIPTION_NOT_STRING: 'Introduce yourself must be a string',
    DESCRIPTION_MIN_LENGTH:
        'Introduce yourself must be at least {{#limit}} characters',
    DESCRIPTION_MAX_LENGTH:
        'Introduce yourself must be at most {{#limit}} characters',
    PREFERRED_LANGUAGES_DIDNT_MATCH_ALLOWED_TYPES:
        'Preferred languages did not match allowed languages',
    PREFERRED_NOTCONSIDERED_DIDNT_MATCH_ALLOWED_TYPES:
        'Preferred not considered did not match allowed not considered',
    PREFERRED_ENGLISH_LEVEL_DIDNT_MATCH_ALLOWED_TYPES:
        'Preferred english level did not match allowed english level',
    PROJECT_LINKS_DIDNT_MATCH_ALLOWED_TYPES:
        'Project links must be a valid URL, between 5 and 50 characters',
    PROJECT_LINKS_MAX_LINKS:
        'Project links must contain less than {{#limit}} links',
    PROJECT_LINKS_INVALID_URL: 'Project links must be a valid URL',
    PROJECT_LINKS_MIN_LENGTH:
        'Project links must contain at least {{#limit}} chars',
    PROJECT_LINKS_MAX_LENGTH:
        'Project links must contain less than {{#limit}} chars',
    FULL_NAME_MIN_LENGTH: 'Full name must be at least {{#limit}} characters',
    FULL_NAME_MAX_LENGTH: 'Full name must be at most {{#limit}} characters',
    FULL_NAME_WRONG_PATTERN: 'Full name must contain only letters',
    PHONE_NUMBER_PATTERN: 'Phone number is invalid',
    LINKEDIN_LINK_LENGTH:
        'LinkedIn must be between {{#limit.min}} and {{#limit.max}} characters',
    LINKEDIN_LINK_WRONG_PATTERN:
        'Link format must be https://www.linkedin.com/in/',
    LINKEDIN_LINK_MIN_LENGTH:
        'LinkedIn link must be at least {{#limit}} characters',
    LINKEDIN_LINK_MAX_LENGTH:
        'LinkedIn link must be at most {{#limit}} characters',
    COMPANY_LOGO_MAX_SIZE: 'Please upload a company logo smaller than 5 MB.',
    COMPANY_WEBSITE_INVALID_URL:
        'Company website must be a valid URL. Please make sure it starts with "http://" or "https://" and includes a valid domain name (e.g., www.example.com).',
    COMPANY_WEBSITE_MIN_LENGTH:
        'Company website must be at least {{#limit}} characters',
    COMPANY_WEBSITE_MAX_LENGTH:
        'Company website must be at most {{#limit}} characters',
    POSITION_WRONG_PATTERN: 'Position must contain only letters and spaces',
    POSITION_NOT_STRING: 'Position must be a string',
    POSITION_MIN_LENGTH: 'Position must be at least {{#limit}} characters',
    POSITION_MAX_LENGTH: 'Position must be at most {{#limit}} characters',
    COMPANY_NAME_WRONG_PATTERN:
        'Company name must contain only letters, special characters and spaces',
    COMPANY_NAME_NOT_STRING: 'Company name must be a string',
    COMPANY_NAME_MIN_LENGTH:
        'Company name must be at least {{#limit}} characters',
    COMPANY_NAME_MAX_LENGTH:
        'Company name must be at most {{#limit}} characters',
    DENIED_REASON_NOT_STRING: 'Denied reason must be a string',
    IS_APPROVED_NOT_BOOLEAN: 'Is approved must be a boolean',
    IS_HIRED_NOT_BOOLEAN: 'Is hired must be a boolean',
    HIRED_SALARY_NOT_NUMBER: 'Hired salary must be a number',
    HIRED_SALARY_MIN_VALUE: 'Hired salary must be at least {{#limit}} ',
    HIRED_SALARY_MAX_VALUE: 'Hired salary must be at most {{#limit}} ',
} as const;

export { UserDetailsValidationMessage };
