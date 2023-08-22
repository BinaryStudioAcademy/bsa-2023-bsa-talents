import { type FC } from 'react';
import { type RouteProps } from 'react-router-dom';
import { Navigate, Route } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { DataStatus } from '~/bundles/common/enums/data-status.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';

const ProtectedRoute: FC<RouteProps> = ({ ...props }) => {
    const { dataStatus } = useAppSelector(({ users }) => ({
        dataStatus: users.dataStatus,
    }));

    const isAuth = dataStatus === DataStatus.FULFILLED;

    if (!isAuth) {
        return <Navigate to={AppRoute.SIGN_IN} replace />;
    }

    return <Route {...props} />;
};

export { ProtectedRoute };
