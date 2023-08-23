import '~/assets/css/styles.scss';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    App,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { theme } from '~/bundles/common/theme/theme.js';
import { store } from '~/framework/store/store.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
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
                                        path: AppRoute.SIGN_UP,
                                        element: <Auth />,
                                    },
                                ],
                            },
                        ]}
                    />
                </StoreProvider>
            </StyledEngineProvider>
        </ThemeProvider>
    </StrictMode>,
);
