const StepFourValidationMessage = {
    IMG_MAX_SIZE: 'Allowed image file is < 5MB',
    IMG_TYPE: 'Allowed image could be only jpeg, png, jpg',
    FULL_NAME_REQUIRED: 'The Full name is required',
    FULL_NAME_MAX_LENGTH:
        'The Full name field should max 50 characters in length',
    FULL_NAME_MIN_LENGTH:
        'The Full name field should min 3 characters in length',
    FULL_NAME_REGEX:
        'The Full name field should accept A-Z, a-z, (.), (-), spaces',
    PHONE_NUMBER_REQUIRED: 'The Phone number is required',
    PHONE_NUMBER_LENGTH: 'Allow up to 10 symbols total',
    PHONE_NUMBER_REGEX:
        'The Phone number must start with "+" and contain digits 0-9 only',
    LINKEDIN_LINK_REQUIRED: 'LinkedIn profile is required',
    LINKEDIN_LINK_MAX_LENGTH: 'Length should be max 250 chars',
    LINKEDIN_LINK_MIN_LENGTH: 'Length should be min 30 chars',
    LINKEDIN_LINK_REGEX:
        'LinkedIn profile field accepts only links in the format of: https://www.linkedin.com/in/',
    CV_MAX_SIZE: 'Max size 5MB size',
    CV_TYPE_REGEX: 'Allowed types for CV file should be docx, doc, pdf',
} as const;

export { StepFourValidationMessage };
