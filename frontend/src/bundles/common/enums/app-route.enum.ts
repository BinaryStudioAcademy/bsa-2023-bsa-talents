const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    TALENT: '/talent',
    TALENT_STEP: '/talent/onboarding/step/:step',
    CONTACT_TALENT: '/contact-talent', // Remove later!
    OTHER: '*',
} as const;

export { AppRoute };
