const UsersApiPath = {
    ROOT: '',
    LMS_DATA_BY_$ID: '/:userId/lms-data',
    LMS_DATA_TEST: '/:userEmail/lms-data-test', // TODO: remove after finished all tests
} as const;

export { UsersApiPath };
