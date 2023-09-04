const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    SIGN_UP_TALENT: '/sign-up-talent',
    SIGN_UP_TALENT_STEP: '/sign-up-talent/onboarding/step/:step',
    OTHER: '*',
} as const;

export { AppRoute };
