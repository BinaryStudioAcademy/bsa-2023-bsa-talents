import { type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

import { DataStatus } from '../../enums/enums.js';
import { Loader } from '../components.js';

type Properties = {
    children: ReactNode;
};

const ProtectedRoute: FC<Properties> = ({ children }) => {
    const { currentUser, dataStatus } = useAppSelector(({ auth }) => ({
        currentUser: auth.currentUser,
        dataStatus: auth.dataStatus,
    }));
    const hasUser = Boolean(currentUser);

    if (dataStatus === DataStatus.IDLE || dataStatus === DataStatus.PENDING) {
        return <Loader />;
    }

    if (hasUser) {
        return <>{children}</>;
    }
    return <Navigate to={AppRoute.SIGN_IN} replace />;
};

export { ProtectedRoute };
