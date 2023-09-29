import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { Navigate } from '../components/components.js';
import { AppRoute } from '../enums/app-route.enum.js';
import { configureString } from '../helpers/helpers.js';
import { useAppSelector, useEffect, useNavigate } from '../hooks/hooks.js';
import { UserRole } from '../types/types.js';

const Home: React.FC = () => {
    const { role } = useAppSelector(({ auth }) => ({
        role: auth.currentUser?.role,
    }));
    const { isApproved } = useAppSelector((state: RootReducer) =>
        role == UserRole.TALENT
            ? state.talentOnBoarding
            : state.employerOnBoarding,
    );
    const navigate = useNavigate();
    useEffect(() => {
        if (isApproved) {
            navigate(AppRoute.CHATS);
        }
    }, [isApproved, navigate]);

    switch (role) {
        case UserRole.ADMIN: {
            return <Navigate to={AppRoute.ADMIN_VERIFICATIONS_PANEL} />;
        }
        case UserRole.TALENT: {
            return (
                <Navigate
                    to={configureString(AppRoute.TALENT_STEP, {
                        step: StepsRoute.STEP_05,
                    })}
                />
            );
        }
        case UserRole.EMPLOYER: {
            return <Navigate to={AppRoute.MY_PROFILE_EMPLOYER} />;
        }
        default: {
            return <Navigate to={AppRoute.SIGN_IN} />;
        }
    }
};

export { Home };
