import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
    App,
    Navigate,
    PageLayout,
    ProtectedRoute,
    PublicRoute,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { store } from '~/framework/store/store.js';

import { AdminPanel } from './bundles/admin-panel/admin-panel.js';
import {
    ResetPasswordPage,
    SignInPage,
    SignUpPage,
} from './bundles/auth/pages/pages.js';
import { ChatsPage } from './bundles/chat/pages/chats/chats-page.js';
import { NotFoundPage } from './bundles/common/pages/not-found/not-found.js';
import { theme } from './bundles/common/themes/theme.js';
import { Onboarding as EmployerOnboarding } from './bundles/employer-onboarding/pages/onboarding/onboarding.js';
import { Candidates } from './bundles/employers/pages/candidates.js';
import { StepNavigation } from './bundles/talent-onboarding/components/components.js';
import { StepsRoute } from './bundles/talent-onboarding/enums/enums.js';
import { getStepRoute } from './bundles/talent-onboarding/helpers/helpers.js';
import { CandidatePage } from './bundles/talent-onboarding/pages/candidate-page/candidate-page.js';
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
                                        element: (
                                            <Navigate
                                                to={getStepRoute(
                                                    StepsRoute.STEP_01,
                                                )}
                                            />
                                        ),
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
                                        path: AppRoute.EMPLOYER_ONBOARDING,
                                        element: (
                                            <ProtectedRoute>
                                                <EmployerOnboarding />
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
                                        path: AppRoute.ADMIN_PANEL,
                                        element: (
                                            <ProtectedRoute>
                                                <PageLayout
                                                    avatarUrl=""
                                                    isOnline
                                                >
                                                    <AdminPanel />
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
