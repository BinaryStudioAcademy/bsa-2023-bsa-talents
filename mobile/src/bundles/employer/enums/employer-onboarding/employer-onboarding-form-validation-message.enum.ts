const EmployerOnboardingFormValidationMessage = {
    FULL_NAME_REQUIRED: 'Full name is required',
    FULL_NAME_MIN_LENGTH: 'Full name must be at least {{#limit}} characters',
    FULL_NAME_MAX_LENGTH: 'Full name must be at most {{#limit}} characters',
    FULL_NAME_WRONG_PATTERN: 'Full name must contain only letters',
    LINKEDIN_LINK_REQUIRED: 'LinkedIn is required',
    LINKEDIN_LINK_LENGTH:
        'LinkedIn must be between {{#limit.min}} and {{#limit.max}} characters',
    LINKEDIN_LINK_WRONG_PATTERN: 'Invalid LinkedIn URL format',
    LINKEDIN_LINK_MIN_LENGTH:
        'LinkedIn link must be at least {{#limit}} characters',
    LINKEDIN_LINK_MAX_LENGTH:
        'LinkedIn link must be at most {{#limit}} characters',

    COMPANY_WEBSITE_LINK_REQUIRED: 'Website is required',
    COMPANY_WEBSITE_LENGTH:
        'Website must be between {{#limit.min}} and {{#limit.max}} characters',
    COMPANY_WEBSITE_WRONG_PATTERN: 'Invalid Website URL format',
    COMPANY_WEBSITE_MIN_LENGTH:
        'Website link must be at least {{#limit}} characters',
    COMPANY_WEBSITE_MAX_LENGTH:
        'Website link must be at most {{#limit}} characters',

    LOCATION_NOT_STRING: 'Location must be a string',
    LOCATION_REQUIRED: 'Location is required',
    LOCATION_BASE: 'Please select a valid location from the provided options',

    COMPANY_NAME_REQUIRED: 'Company name is required',
    COMPANY_NAME_MIN_LENGTH:
        'Company name must be at least {{#limit}} characters',
    COMPANY_NAME_MAX_LENGTH:
        'Company name must be at most {{#limit}} characters',
    COMPANY_NAME_WRONG_PATTERN: 'Company name must contain only letters',

    POSITION_REQUIRED: 'Your position is required',
    POSITION_MIN_LENGTH: 'Your position must be at least {{#limit}} characters',
    POSITION_MAX_LENGTH: 'Your position must be at most {{#limit}} characters',
    POSITION_WRONG_PATTERN: 'Your position must contain only letters',
    DESCRIPTION_REQUIRED: 'About your company is required',
    DESCRIPTION_MAX_LENGTH:
        'Your position must be at most {{#limit}} characters',
} as const;

export { EmployerOnboardingFormValidationMessage };
