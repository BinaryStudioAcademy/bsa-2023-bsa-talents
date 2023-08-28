const SignUpStep1ValidationMessage = {
    PROFILE_NAME_NOT_STRING: 'Profile name must be a string',
    PROFILE_NAME_REQUIRED: 'Profile name is required',
    PROFILE_NAME_MIN_LENGTH:
        'Profile name must be at least {{#limit}} characters',
    PROFILE_NAME_MAX_LENGTH:
        'Profile name must be at most {{#limit}} characters',
    PROFILE_NAME_WRONG_PATTERN:
        'Profile name must contain only letters, spaces, (.) and (-)',
    SALARY_EXPECTATIONS_NOT_STRING: 'Salary expectations must be a string',
    SALARY_EXPECTATIONS_REQUIRED: 'Salary expectations is required',
    SALARY_EXPECTATIONS_LENGTH:
        'Salary expectations must be between 1 and 4 characters',
    SALARY_EXPECTATIONS_WRONG_PATTERN:
        'Salary expectations must contain only numeric values',
};

export { SignUpStep1ValidationMessage };
