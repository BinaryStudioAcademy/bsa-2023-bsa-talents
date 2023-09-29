const UsersApiPath = {
    ROOT: '',
    LMS_DATA_BY_$ID: '/:userId/lms-data',
    BSA_BADGES_BY_$ID: '/:userId/bsa-badges',
} as const;

export { UsersApiPath };
