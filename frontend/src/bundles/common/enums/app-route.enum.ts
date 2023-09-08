const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESET_PASSWORD: '/reset-password',
    TALENT: '/talent',
    TALENT_STEP: '/talent/onboarding/step/:step',
    CANDIDATES: '/candidates',
    OTHER: '*',
} as const;

export { AppRoute };
