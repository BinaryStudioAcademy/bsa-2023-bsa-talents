const ContactsCVStepValidationMessage = {
    FULL_NAME_REQUIRED: 'Full name is required',
    FULL_NAME_MIN_LENGTH: 'Full name must be at least {{#limit}} characters',
    FULL_NAME_MAX_LENGTH: 'Full name must be at most {{#limit}} characters',
    FULL_NAME_WRONG_PATTERN: 'Full name must contain only letters, spaces',
    PHONE_NUMDER_REQUIRED: 'Phone number is required',
    PHONE_NUMBER_PATTERN: 'Phone number is invalid',
    LINKEDIN_LINK_REQUIRED: 'LinkedIn is required',
    LINKRDIN_LINK_LENGTH:
        'LinkedIn must be between {{#limit.min}} and {{#limit.max}} characters',
    LINKEDIN_LINK_WRONG_PATTERN:
        'LinkedIn link must begin with linkedin.com/in/',
    LINKEDIN_LINK_MIN_LENGTH:
        'LinkedIn link must be at least {{#limit}} characters',
    LINKEDIN_LINK_MAX_LENGTH:
        'LinkedIn link must be at most {{#limit}} characters',
};

export { ContactsCVStepValidationMessage };
