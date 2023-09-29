import { type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { useAppSelector } from '~/bundles/common/hooks/hooks.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';

import { UserRole } from '../../enums/enums.js';
import { configureString } from '../../helpers/helpers.js';

type Properties = {
    children: ReactNode;
};

const PublicRoute: FC<Properties> = ({ children }) => {
    const { currentUser, role } = useAppSelector(({ auth }) => ({
        role: auth.currentUser?.role,
        currentUser: auth.currentUser,
        dataStatus: auth.dataStatus,
    }));
    const hasUser = Boolean(currentUser);

    if (!hasUser) {
        return children;
    }

    switch (role) {
        case UserRole.ADMIN: {
            return <Navigate to={AppRoute.ADMIN_VERIFICATIONS_PANEL} />;
        }
        case UserRole.TALENT: {
            return (
                <Navigate
                    to={configureString(AppRoute.MY_PROFILE_TALENT, {
                        step: StepsRoute.STEP_01,
                    })}
                />
            );
        }
        case UserRole.EMPLOYER: {
            return <Navigate to={AppRoute.MY_PROFILE_EMPLOYER} />;
        }
    }
};

export { PublicRoute };
