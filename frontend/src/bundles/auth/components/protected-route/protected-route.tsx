import { type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { Loader } from '~/bundles/common/components/loader/loader.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

type ProtectedRouteProperties = {
    children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProperties> = ({ children }) => {
    const { dataStatus } = useAppSelector(({ users }) => ({
        dataStatus: users.dataStatus,
    }));

    const isAuth = dataStatus === DataStatus.FULFILLED;

    if (dataStatus === DataStatus.PENDING) {
        return <Loader />;
    }

    return isAuth ? (
        <>{children}</>
    ) : (
        <Navigate to={AppRoute.SIGN_IN} replace />
    );
};

export { ProtectedRoute };
