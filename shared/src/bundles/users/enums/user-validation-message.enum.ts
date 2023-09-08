const UserValidationMessage = {
    EMAIL_REQUIRE: 'Email is required',
    EMAIL_WRONG: 'Email is wrong',
    PASSWORD_WRONG:
        'Password should contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit and one special character ',
    PASSWORD_REQUIRE: 'Password is not allowed to be empty',
    PASSWORD_SHORT: 'Password length must be at least 8 characters long',
} as const;

export { UserValidationMessage };
