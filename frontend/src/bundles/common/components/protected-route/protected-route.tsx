import { type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { type State } from '~/bundles/auth/store/auth.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { DataStatus } from '../../enums/enums.js';
import { Loader } from '../components.js';

type Properties = {
    children: ReactNode;
};

const getAuthState = (state: RootReducer): State => state.auth;

const ProtectedRoute: FC<Properties> = ({ children }) => {
    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );
    const dataStatus = useAppSelector(
        (rootState) => getAuthState(rootState).dataStatus,
    );
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
