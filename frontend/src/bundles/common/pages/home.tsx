import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { Navigate } from '../components/components.js';
import { AppRoute } from '../enums/app-route.enum.js';
import { configureString } from '../helpers/helpers.js';
import { useAppSelector } from '../hooks/hooks.js';
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
    switch (role) {
        case UserRole.ADMIN: {
            return <Navigate to={AppRoute.ADMIN_VERIFICATIONS_PANEL} />;
        }
        case UserRole.TALENT: {
            if (isApproved) {
                return <Navigate to={AppRoute.CHATS} />;
            }
            return (
                <Navigate
                    to={configureString(AppRoute.TALENT_STEP, {
                        step: StepsRoute.STEP_05,
                    })}
                />
            );
        }
        case UserRole.EMPLOYER: {
            if (isApproved) {
                return <Navigate to={AppRoute.CHATS} />;
            }
            return <Navigate to={AppRoute.CANDIDATES} />;
        }
        default: {
            return <Navigate to={AppRoute.NOT_FOUND} />;
        }
    }
};

export { Home };
