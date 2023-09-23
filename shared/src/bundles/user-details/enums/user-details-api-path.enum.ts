const UserDetailsApiPath = {
    ROOT: '',
    $ID: '/:userId',
    APPROVE: '/:userId/approve',
    DENY: '/:userId/deny',
    SHORT: '/short',
    PUBLISH: '/:userId/publish',
} as const;

export { UserDetailsApiPath };
