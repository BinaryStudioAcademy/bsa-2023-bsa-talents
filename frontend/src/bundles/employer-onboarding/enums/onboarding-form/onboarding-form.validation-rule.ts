const EmployerOnboardingValidationRule = {
    MIN_FULL_NAME_LENGTH: 3,
    MAX_FULL_NAME_LENGTH: 50,
    MIN_LINKEDIN_LINK_LENGTH: 30,
    MAX_LINKEDIN_LINK_LENGTH: 250,
    MIN_DESCRIPTION_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 2500,
    MIN_LENGTH_COMPANY_WEBSITE: 5,
    MAX_LENGTH_COMPANY_WEBSITE: 250,
    MIN_POSITION_LENGTH: 2,
    MAX_POSITION_LENGTH: 50,
    MIN_COMPANY_NAME_LENGTH: 2,
    MAX_COMPANY_NAME_LENGTH: 50,
    MAX_FILE_SIZE: 5_242_880,
    URL_REGEX_CONSTANT: /^(www\.|http:\/\/|https:\/\/)[^.]+(\..+)+$/,
} as const;

export { EmployerOnboardingValidationRule };
