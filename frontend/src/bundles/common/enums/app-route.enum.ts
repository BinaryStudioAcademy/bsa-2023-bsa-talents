const AppRoute = {
    ADMIN: '/admin',
    ADMIN_PANEL: '/admin/verification-panel',
    ROOT: '/',
    CANDIDATES: '/candidates',
    CANDIDATE: '/candidates/:candidate',
    CHATS: '/chats',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:token',
    EMPLOYER_ONBOARDING: '/employer/onboarding',
    TALENT_STEP: '/talent/onboarding/step/:step',
    NOT_FOUND: '/not-found',
    MY_PROFILE_TALENT: '/talent/my/:step',
    MY_PROFILE_EMPLOYER: '/employer/my/profile',
    OTHER: '*',
    SAME_PAGE: '#',
} as const;

export { AppRoute };
