const AUTH_CONSTANTS = {
    MIN_PASSWORD_LENGTH: 8,
    MIN_EMAIL_LENGTH: 5,
    MAX_LOGIN_INPUT_LENGTH: 50,
    PASSWORD_REGEXP:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&()*+,./:;<=>?@^_{}-]).+$/,
};

export { AUTH_CONSTANTS };
