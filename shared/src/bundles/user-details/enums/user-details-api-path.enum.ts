const UserDetailsApiPath = {
    ROOT: '',
    $ID: '/:userId',
    APPROVE: '/:userId/approve',
    DENY: '/:userId/deny',
    SHORT: '/short',
} as const;

export { UserDetailsApiPath };
