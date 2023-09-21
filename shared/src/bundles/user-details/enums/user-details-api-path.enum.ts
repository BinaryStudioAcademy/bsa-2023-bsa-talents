const UserDetailsApiPath = {
    ROOT: '',
    $ID: '/:userId',
    APPROVE: '/approve/:userId',
    DENY: '/deny/:userId',
    SHORT: '/short',
} as const;

export { UserDetailsApiPath };
