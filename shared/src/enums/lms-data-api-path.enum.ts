const LMSDataApiPath = {
    ROOT: '/',
    $ID: '/:userId',
    TEST: 'https://api.github.com/users/github',
    LMS_SERVER:
        'https://study.binary-studio.com/api/student/talents-integration',
} as const;

export { LMSDataApiPath };
