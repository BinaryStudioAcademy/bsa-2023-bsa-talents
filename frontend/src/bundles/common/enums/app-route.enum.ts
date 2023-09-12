const AppRoute = {
    ROOT: '/',
    CANDIDATES: '/candidates',
    CHATS: '/chats',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESET_PASSWORD: '/reset-password',
    TALENT_STEP: '/talent/onboarding/step/:step',
    CONTACT_TALENT: '/contact-talent', // Remove later!
    NOT_FOUND: 'not-found',
    OTHER: '*',
} as const;

export { AppRoute };
