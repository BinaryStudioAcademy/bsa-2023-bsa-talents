import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
    App,
    Navigate,
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
import { NotFoundPage } from './bundles/common/pages/not-found/not-found.js';
import { theme } from './bundles/common/themes/theme.js';
import { StepNavigation } from './bundles/talent-onboarding/components/components.js';
import { STEP_ROUTES } from './bundles/talent-onboarding/constants/constants.js';
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
                                                    STEP_ROUTES.STEP_01,
                                                )}
                                            />
                                        ),
                                    },
                                    {
                                        path: AppRoute.TALENT,
                                        element: <Onboarding />,
                                        children: [
                                            {
                                                path: AppRoute.TALENT,
                                                element: (
                                                    <Navigate
                                                        to={getStepRoute(
                                                            STEP_ROUTES.STEP_01,
                                                        )}
                                                    />
                                                ),
                                            },
                                            {
                                                path: AppRoute.TALENT_STEP,
                                                element: <StepNavigation />,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                path: AppRoute.SIGN_IN,
                                element: <SignInPage />,
                            },
                            {
                                path: AppRoute.SIGN_UP,
                                element: <SignUpPage />,
                            },
                            {
                                path: AppRoute.RESET_PASSWORD,
                                element: <ResetPasswordPage />,
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
