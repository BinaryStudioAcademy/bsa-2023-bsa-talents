import { type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

type Properties = {
    children: ReactNode;
};

const ProtectedRoute: FC<Properties> = ({ children }) => {
    //TODO: update when user data will be stored in the store
    const hasUser = false;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return hasUser ? (
        <>{children}</>
    ) : (
        <Navigate to={AppRoute.SIGN_IN} replace />
    );
};

export { ProtectedRoute };
