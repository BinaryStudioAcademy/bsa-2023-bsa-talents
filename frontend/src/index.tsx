import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth.js';
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

import { Candidate } from './bundles/candidate/pages/candidate.js'; // Remove after testing
import { NotFoundPage } from './bundles/common/pages/not-found/not-found.js';
import { theme } from './bundles/common/themes/theme.js';
import { StepNavigation } from './bundles/talent-onboarding/components/components.js';
import { StepsRoute } from './bundles/talent-onboarding/enums/enums.js';
import { getStepRoute } from './bundles/talent-onboarding/helpers/helpers.js';
import { Onboarding } from './bundles/talent-onboarding/pages/onboarding/onboarding.js';

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
                                        path: AppRoute.CONTACT_TALENT, // Remove after testing
                                        element: <Candidate />,
                                    },
                                    {
                                        path: AppRoute.SIGN_IN,
                                        element: (
                                            <PublicRoute>
                                                <Auth />
                                            </PublicRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.SIGN_UP,
                                        element: (
                                            <PublicRoute>
                                                <Auth />
                                            </PublicRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.RESET_PASSWORD,
                                        element: (
                                            <PublicRoute>
                                                <Auth />
                                            </PublicRoute>
                                        ),
                                    },
                                    {
                                        path: AppRoute.TALENT_STEP,
                                        element: (
                                            <ProtectedRoute>
                                                <Onboarding />
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
                                        path: AppRoute.CHATS,
                                        element: (
                                            <ProtectedRoute>
                                                <PageLayout
                                                    avatarUrl=""
                                                    isOnline
                                                >
                                                    <div></div>
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
                                                    <div></div>
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
