const EmployerOnboardingValidationMessage = {
    PHOTO_MAX_SIZE: 'Please upload a photo smaller than 5 MB.',
    FULL_NAME_REQUIRED: 'Full name is required',
    FULL_NAME_MIN_LENGTH: 'Full name must be at least {{#limit}} characters',
    FULL_NAME_MAX_LENGTH: 'Full name must be at most {{#limit}} characters',
    FULL_NAME_WRONG_PATTERN: 'Full name must contain only letters',
    PHONE_NUMBER_REQUIRED: 'Phone number is required',
    PHONE_NUMBER_PATTERN: 'Phone number is invalid',
    LINKEDIN_LINK_REQUIRED: 'LinkedIn is required',
    LINKEDIN_LINK_LENGTH:
        'LinkedIn must be between {{#limit.min}} and {{#limit.max}} characters',
    LINKEDIN_LINK_WRONG_PATTERN:
        'Link format must be https://www.linkedin.com/in/',
    LINKEDIN_LINK_MIN_LENGTH:
        'LinkedIn link must be at least {{#limit}} characters',
    LINKEDIN_LINK_MAX_LENGTH:
        'LinkedIn link must be at most {{#limit}} characters',
    COMPANY_LOGO_MAX_SIZE: 'Please upload a company logo smaller than 5 MB.',
    DESCRIPTION_WRONG_PATTERN:
        'Description must contain only letters, special characters and spaces',
    DESCRIPTION_NOT_STRING: 'Description must be a string',
    DESCRIPTION_MAX_LENGTH: 'Description must be at most {{#limit}} characters',
    LOCATION_NOT_STRING: 'Location must be a string',
    LOCATION_REQUIRED: 'Location is required',
    LOCATION_BASE: 'Please select a valid location from the provided options',
    COMPANY_WEBSITE_REQUIRED: 'Company website is required',
    COMPANY_WEBSITE_INVALID_URL:
        'Company website must be a valid URL. Please make sure it starts with "http://" or "https://" and includes a valid domain name (e.g., www.example.com).',
    COMPANY_WEBSITE_MIN_LENGTH:
        'Company website must be at least {{#limit}} characters',
    COMPANY_WEBSITE_MAX_LENGTH:
        'Company website must be at most {{#limit}} characters',
    POSITION_REQUIRED: 'Position is required',
    POSITION_WRONG_PATTERN:
        'Position must contain only letters, special characters and spaces',
    POSITION_NOT_STRING: 'Position must be a string',
    POSITION_MIN_LENGTH: 'Position must be at least {{#limit}} characters',
    POSITION_MAX_LENGTH: 'Position must be at most {{#limit}} characters',
    COMPANY_NAME_REQUIRED: 'Company name is required',
    COMPANY_NAME_WRONG_PATTERN:
        'Company name must contain only letters, special characters and spaces',
    COMPANY_NAME_NOT_STRING: 'Company name must be a string',
    COMPANY_NAME_MIN_LENGTH:
        'Company name must be at least {{#limit}} characters',
    COMPANY_NAME_MAX_LENGTH:
        'Company name must be at most {{#limit}} characters',
};

export { EmployerOnboardingValidationMessage };
