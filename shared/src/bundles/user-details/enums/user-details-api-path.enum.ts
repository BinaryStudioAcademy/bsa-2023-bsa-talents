const UserDetailsApiPath = {
    ROOT: '/',
    $ID: '/:userId',
    APPROVE: '/approve',
    SHORT: '/short',
    PUBLISH: '/:userId/publish',
} as const;

export { UserDetailsApiPath };
