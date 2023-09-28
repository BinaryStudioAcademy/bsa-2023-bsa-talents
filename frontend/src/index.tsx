import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
    App,
    PageLayout,
    ProtectedRoute,
    PublicRoute,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { store } from '~/framework/store/store.js';

import { AdminConnectionsPanel } from './bundles/admin-panel/pages/connections/connections-panel.js';
import { AdminVerificationsPanel } from './bundles/admin-panel/pages/verifications/verifications-panel.js';
import {
    ForgotPasswordPage,
    SignInPage,
    SignUpPage,
} from './bundles/auth/pages/pages.js';
import { ResetPasswordPage } from './bundles/auth/pages/reset-password-page/reset-password-page.js';
import { ChatsPage } from './bundles/chat/pages/chats/chats-page.js';
import { FormSubmitProvider } from './bundles/common/context/context.js';
import { Home } from './bundles/common/pages/home.js';
import { NotFoundPage } from './bundles/common/pages/not-found/not-found.js';
import { theme } from './bundles/common/themes/theme.js';
import { CompanyPage } from './bundles/employer/pages/company/company-page.js';
import { Onboarding as EmployerOnboarding } from './bundles/employer-onboarding/pages/onboarding/onboarding.js';
import { ProfileCabinet } from './bundles/profile-cabinet/pages/profile-cabinet.js';
import { CandidatePage } from './bundles/search-candidates/pages/candidate-page/candidate-page.js';
import { Candidates } from './bundles/search-candidates/pages/candidates.js';
import { StepNavigation } from './bundles/talent-onboarding/components/components.js';
import { Onboarding as TalentOnboarding } from './bundles/talent-onboarding/pages/onboarding/onboarding.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <StoreProvider store={store.instance}>
                    <RouterProvider
                        routes={[
                            {
                                path: AppRoute.ROOT,
                                element: <App />,
                                children: [
                                    {
                                        path: AppRoute.ROOT,
                                        element: <Home />,
                                    },
                                    {
                                        path: AppRoute.CANDIDATE,
                                        element: (
                                            <PageLayout avatarUrl="" isOnline>
                                                <CandidatePage />
                                            </PageLayout>
                                        ),
                                    },
                                    {
                                        path: AppRoute.COMPANY,
                                        element: (
                                            <ProtectedRoute>
                                                <PageLayout
                                                    avatarUrl=""
                                                    isOnline
                                                >
                                                    <CompanyPage />
                                                </PageLayout>
                                            </ProtectedRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.SIGN_IN,
                                        element: (
                                            <PublicRoute>
                                                <SignInPage />
                                            </PublicRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.SIGN_UP,
                                        element: (
                                            <PublicRoute>
                                                <SignUpPage />
                                            </PublicRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.FORGOT_PASSWORD,
                                        element: (
                                            <PublicRoute>
                                                <ForgotPasswordPage />
                                            </PublicRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.RESET_PASSWORD,
                                        element: (
                                            <PublicRoute>
                                                <ResetPasswordPage />
                                            </PublicRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.TALENT_STEP,
                                        element: (
                                            <ProtectedRoute>
                                                <TalentOnboarding />
                                            </ProtectedRoute>
                                        ),
                                        children: [
                                            {
                                                path: '',
                                                element: <StepNavigation />,
                                            },
                                        ],
                                    },
                                    {
                                        path: AppRoute.MY_PROFILE_TALENT,
                                        element: (
                                            <ProtectedRoute>
                                                <FormSubmitProvider>
                                                    <ProfileCabinet />
                                                </FormSubmitProvider>
                                            </ProtectedRoute>
                                        ),
                                        children: [
                                            {
                                                path: '',
                                                element: (
                                                    <ProtectedRoute>
                                                        <StepNavigation />
                                                    </ProtectedRoute>
                                                ),
                                            },
                                        ],
                                    },
                                    {
                                        path: AppRoute.MY_PROFILE_EMPLOYER,
                                        element: (
                                            <ProtectedRoute>
                                                <FormSubmitProvider>
                                                    <ProfileCabinet />
                                                </FormSubmitProvider>
                                            </ProtectedRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.EMPLOYER_ONBOARDING,
                                        element: (
                                            <ProtectedRoute>
                                                <FormSubmitProvider>
                                                    <EmployerOnboarding />
                                                </FormSubmitProvider>
                                            </ProtectedRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.CHATS,
                                        element: (
                                            <ProtectedRoute>
                                                <PageLayout
                                                    avatarUrl=""
                                                    isOnline
                                                >
                                                    <ChatsPage />
                                                </PageLayout>
                                            </ProtectedRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.CANDIDATES,
                                        element: (
                                            <ProtectedRoute>
                                                <PageLayout
                                                    avatarUrl=""
                                                    isOnline
                                                >
                                                    <Candidates />
                                                </PageLayout>
                                            </ProtectedRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.ADMIN_VERIFICATIONS_PANEL,
                                        element: (
                                            <ProtectedRoute>
                                                <PageLayout
                                                    avatarUrl=""
                                                    isOnline
                                                >
                                                    <AdminVerificationsPanel />
                                                </PageLayout>
                                            </ProtectedRoute>
                                        ),
                                    },

                                    {
                                        path: AppRoute.ADMIN_CONNECTIONS_PANEL,
                                        element: (
                                            <ProtectedRoute>
                                                <PageLayout
                                                    avatarUrl=""
                                                    isOnline
                                                >
                                                    <AdminConnectionsPanel />
                                                </PageLayout>
                                            </ProtectedRoute>
                                        ),
                                    },
                                ],
                            },
                            {
                                path: AppRoute.NOT_FOUND,
                                element: <NotFoundPage />,
                            },
                            {
                                path: AppRoute.OTHER,
                                element: <NotFoundPage />,
                            },
                        ]}
                    />
                </StoreProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </StrictMode>,
);
