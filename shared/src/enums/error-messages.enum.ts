const ErrorMessages = {
    NOT_AUTHORIZED: 'You are not authorized to access this route.',
    USER_ALREADY_EXIST: 'User already exist.',
    INCORRECT_EMAIL: 'Incorrect email.',
    EMAIL_ALREADY_EXISTS: 'Email is already taken.',
    PASSWORDS_NOT_MATCH: 'Passwords do not match.',
    UNKNOWN_ERROR: 'Application error',
    USER_NOT_FOUND: 'No user found for provided credentials',
    MISSING_TOKEN: 'Missing token.',
    INVALID_TOKEN: 'Invalid token.',
    NOT_FOUND: 'Not found.',
    UPDATE_FAILED: 'Update failed.',
    NOT_IMPLEMENTED: 'Not implemented.',
} as const;

export { ErrorMessages };
