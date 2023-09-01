import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    App,
    Navigate,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { store } from '~/framework/store/store.js';

import { StepNavigation } from './bundles/auth/components/components.js';
import { StepRoutes } from './bundles/auth/constants/constants.js';
import { SignUpTalent } from './bundles/auth/pages/sign-up-talent/sign-up-talent.js';
import { NotFoundPage } from './bundles/common/pages/not-found/not-found.js';
import { theme } from './bundles/common/themes/theme.js';

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
                                                to={AppRoute.getSignUpTalentStepRoute(
                                                    StepRoutes.STEP_01,
                                                )}
                                            />
                                        ),
                                    },
                                    {
                                        path: AppRoute.SIGN_IN,
                                        element: <Auth />,
                                    },
                                    {
                                        path: AppRoute.SIGN_UP,
                                        element: <Auth />,
                                    },
                                    {
                                        path: AppRoute.SIGN_UP_TALENT,
                                        element: <SignUpTalent />,
                                        children: [
                                            {
                                                path: AppRoute.SIGN_UP_TALENT,
                                                element: (
                                                    <Navigate
                                                        to={AppRoute.getSignUpTalentStepRoute(
                                                            StepRoutes.STEP_01,
                                                        )}
                                                    />
                                                ),
                                            },
                                            {
                                                path: AppRoute.SIGN_UP_TALENT_STEP,
                                                element: <StepNavigation />,
                                            },
                                        ],
                                    },
                                ],
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
