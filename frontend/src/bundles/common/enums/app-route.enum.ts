const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    CANDIDATES: '/candidates',
    CANDIDATE: '/candidates/:candidate',
    OTHER: '*',
} as const;

export { AppRoute };
