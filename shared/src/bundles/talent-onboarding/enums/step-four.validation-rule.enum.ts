const StepFourValidationRule = {
    IMAGE_MAX_SIZE: 500_000,
    IMAGE_TYPE_REGEX: /\.(jpeg|jpg|png)$/,
    MAX_LENGTH_FULL_NAME: 50,
    MIN_LENGTH_FULL_NAME: 3,
    FULL_NAME_REGEX: /^[\s'.A-Za-z-]+$/,
    PHONE_NUMBER_MAX: 10,
    PHONE_NUMBER_REGEX: /^\+\d{1,10}$/,
    LINKEDIN_LINK_MAX_LENGTH: 250,
    LINKEDIN_LINK_MIN_LENGTH: 30,
    LINKEDIN_REGEX:
        /^https:\/\/www\.linkedin\.com\/in\/[\w!#$%&()*+,./:;<>?@[\\\]^{}~-]+$/,
    CV_REGEX: /\.(docx|doc|pdf)$/,
} as const;

export { StepFourValidationRule };
