const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESET_PASSWORD: '/reset-password',
    TALENT: '/talent',
    TALENT_STEP: '/talent/onboarding/step/:step',
    CANDIDATES: '/candidates',
    CANDIDATE: '/candidates/:candidate',
    OTHER: '*',
} as const;

export { AppRoute };
