const ErrorMessages = {
    NOT_AUTHORIZED: 'You are not authorized to access this route.',
    USER_ALREADY_EXIST: 'User already exist.',
    INCORRECT_EMAIL: 'Incorrect email.',
    EMAIL_ALREADY_EXISTS: 'Email is already taken.',
    PASSWORDS_NOT_MATCH: 'Passwords do not match.',
    ROUTE_ADMIN_ONLY: 'This route is for administrators only',
} as const;

export { ErrorMessages };
