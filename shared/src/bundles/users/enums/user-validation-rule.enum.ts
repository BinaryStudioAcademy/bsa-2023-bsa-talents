const UserValidationRule = {
    MIN_PASSWORD_LENGTH: 8,
    MIN_EMAIL_LENGTH: 5,
    EMAIL_REGEXP: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    MAX_LOGIN_INPUT_LENGTH: 50,
    PASSWORD_REGEXP:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&()*+,./:;<=>?@^_{}-]).+$/,
} as const;

export { UserValidationRule };
