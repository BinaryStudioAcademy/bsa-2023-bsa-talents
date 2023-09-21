const UsersApiPath = {
    ROOT: '/',
    LMS_DATA_BY_$ID: '/:userId/lms-data',
    LMS_DATA_TEST: '/:userEmail/lms-data',
} as const;

export { UsersApiPath };
