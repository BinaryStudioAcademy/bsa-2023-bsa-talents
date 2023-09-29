import { type FC, type ReactNode } from 'react';

import { type State } from '~/bundles/auth/store/auth.js';
import { Navigate } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as employerActions } from '~/bundles/employer-onboarding/store/employer-onboarding.js';
import { actions as talentActions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { UserRole } from '~/bundles/users/users.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { DataStatus } from '../../enums/enums.js';

type Properties = {
    children: ReactNode;
};

const getAuthState = (state: RootReducer): State => state.auth;

const ProtectedRoute: FC<Properties> = ({ children }) => {
    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );

    const hasUser = Boolean(currentUser);

    const dataStatusUserDetails = useAppSelector((state: RootReducer) =>
        currentUser?.role == UserRole.TALENT
            ? state.talentOnBoarding.dataStatus
            : state.employerOnBoarding.dataStatus,
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (currentUser?.role && dataStatusUserDetails == DataStatus.IDLE) {
            switch (currentUser.role) {
                case UserRole.TALENT: {
                    void dispatch(
                        talentActions.getTalentDetails({
                            userId: currentUser.id,
                        }),
                    );
                    break;
                }
                case UserRole.EMPLOYER: {
                    void dispatch(
                        employerActions.getEmployerDetails({
                            userId: currentUser.id,
                        }),
                    );
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }, [currentUser, dataStatusUserDetails, dispatch, hasUser]);

    if (hasUser) {
        return children;
    }
    return <Navigate to={AppRoute.SIGN_IN} replace />;
};

export { ProtectedRoute };
