const AppRoute = {
    ADMIN: '/admin',
    VERIFICATION: '/admin/verification',
    ROOT: '/',
    CANDIDATES: '/candidates',
    CANDIDATE: '/candidates/:candidate',
    CHATS: '/chats',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    RESET_PASSWORD: '/reset-password',
    EMPLOYER_ONBOARDING: '/employer/onboarding',
    TALENT_STEP: '/talent/onboarding/step/:step',
    NOT_FOUND: 'not-found',
    OTHER: '*',
} as const;

export { AppRoute };
