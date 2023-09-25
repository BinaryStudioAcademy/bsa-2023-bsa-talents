const ErrorMessage = {
    NOT_AUTHORIZED: 'You are not authorized to access this route.',
    USER_ALREADY_EXIST: 'User already exist.',
    INCORRECT_EMAIL: 'Incorrect email.',
    EMAIL_ALREADY_EXISTS: 'Email is already taken.',
    PASSWORDS_NOT_MATCH: 'Passwords do not match.',
    INVALID_TOKEN: 'Invalid token.',
    UNAUTHORIZED_USER: 'User not authorized.',
    NOT_FOUND: 'Not found.',
    UPDATE_FAILED: 'Update failed.',
    UNKNOWN_ERROR: 'Application error.',
    USER_NOT_FOUND: 'No user found for provided credentials.',
    NOT_IMPLEMENTED: 'Not implemented.',
    USER_DETAILS_NOT_FOUND: 'User profile not found',
    NOT_FOUND_ON_LMS: 'No not found on LMS server',
    FILE_UPLOAD_ERROR: 'Failed to upload file.',
} as const;

export { ErrorMessage };
