import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    App,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { TestStepLayout } from '~/bundles/sign-up/components/first-step/test.js';
import { store } from '~/framework/store/store.js';

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
                                        element: 'Root',
                                    },
                                    {
                                        path: AppRoute.SIGN_IN,
                                        element: <Auth />,
                                    },
                                    {
                                        path: '/step1',
                                        element: <TestStepLayout />,
                                    },
                                ],
                            },
                        ]}
                    />
                </StoreProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    </StrictMode>,
);
