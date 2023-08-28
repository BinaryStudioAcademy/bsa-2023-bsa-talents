const HttpCode = {
    // Successful responses (2xx)
    OK: 200,
    CREATED: 201,

    // Client error responses (4xx)
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSED_ENTITY: 422,

    // Server error responses (5xx)
    INTERNAL_SERVER_ERROR: 500,
} as const;

export { HttpCode };
