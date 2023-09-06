const ContactsCVStepValidationRule = {
    IMAGE_MAX_SIZE: 500_000,
    IMAGE_TYPE_REGEX: /\.(jpeg|jpg|png)$/,
    MIN_FULL_NAME_LENGTH: 3,
    MAX_FULL_NAME_LENGTH: 50,
    FULL_NAME_REGEX: /^[\s'.A-Za-z-]+$/,
    PHONE_NUMBER_LENGTH: 13,
    PHONE_NUMBER_REGEX: /^\+\d{12}$/,
    MIN_LINKEDIN_LINK_LENGTH: 30,
    MAX_LINKEDIN_LINK_LENGTH: 250,
    LINKEDIN_REGEX: /^linkedin\.com\/in\//,
    CV_TYPE_REGEX: /\.(docx|doc|pdf)$/,
    CV_MAX_SIZE: 500_000,
} as const;

export { ContactsCVStepValidationRule };
