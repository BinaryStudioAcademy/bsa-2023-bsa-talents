import '~/assets/css/styles.scss';

import { ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Auth } from '~/bundles/auth/pages/auth.js';
import {
    App,
    RouterProvider,
    StoreProvider,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { store } from '~/framework/store/store.js';

import { btColorTheme } from './bundles/common/components/color-theme/color-theme.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider theme={btColorTheme}>
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
        </ThemeProvider>
    </StrictMode>,
);
