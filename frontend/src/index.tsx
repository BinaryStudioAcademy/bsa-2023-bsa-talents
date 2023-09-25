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

import {
    ResetPasswordPage,
    SignInPage,
    SignUpPage,
} from './bundles/auth/pages/pages.js';
import { ChatsPage } from './bundles/chat/pages/chats/chats-page.js';
import { FormSubmitProvider } from './bundles/common/context/context.js';
import { NotFoundPage } from './bundles/common/pages/not-found/not-found.js';
import { theme } from './bundles/common/themes/theme.js';
import { Onboarding as EmployerOnboarding } from './bundles/employer-onboarding/pages/onboarding/onboarding.js';
import { Candidates } from './bundles/employers/pages/candidates.js';
import { ProfileCabinet } from './bundles/profile-cabinet/pages/profile-cabinet.js';
import { StepNavigation } from './bundles/talent-onboarding/components/components.js';
import { StepsRoute } from './bundles/talent-onboarding/enums/enums.js';
import { CandidatePage } from './bundles/talent-onboarding/pages/candidate-page/candidate-page.js';
import { Onboarding as TalentOnboarding } from './bundles/talent-onboarding/pages/onboarding/onboarding.js';
import { configureString } from './helpers/helpers.js';

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
                                                to={configureString(
                                                    AppRoute.TALENT_STEP,
                                                    {
                                                        step: StepsRoute.STEP_01,
                                                    },
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
