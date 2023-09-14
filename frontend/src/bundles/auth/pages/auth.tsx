import './styles.scss';

import { type ValueOf } from 'shared/build/index.js';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useLocation,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { getStepRoute } from '~/bundles/talent-onboarding/helpers/helpers.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';

import { AuthLayout } from '../components/auth-layout/auth-layout.js';
import {
    ResetPassword,
    SignInForm,
    SignUpForm,
} from '../components/components.js';
import { UserRole } from '../enums/enums.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const navigateUser = useCallback(
        ({ role }: { role: ValueOf<typeof UserRole> }): void => {
            switch (role) {
                case UserRole.TALENT: {
                    navigate(getStepRoute(StepsRoute.STEP_01));
                    break;
                }
                case UserRole.EMPLOYER: {
                    navigate(AppRoute.EMPLOYER_ONBOARDING);
                    break;
                }
            }
        },
        [navigate],
    );

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload))
                .unwrap()
                .then(navigateUser);
        },
        [dispatch, navigateUser],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
            navigateUser(payload);
        },
        [dispatch, navigateUser],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return (
                    <>
                        <AuthLayout>
                            <SignInForm onSubmit={handleSignInSubmit} />
                        </AuthLayout>
                    </>
                );
            }
            case AppRoute.SIGN_UP: {
                return (
                    <>
                        <AuthLayout>
                            <SignUpForm onSubmit={handleSignUpSubmit} />
                        </AuthLayout>
                    </>
                );
            }
            case AppRoute.RESET_PASSWORD: {
                return (
                    <AuthLayout>
                        <ResetPassword />
                    </AuthLayout>
                );
            }
        }

        return null;
    };

    return <>{getScreen(pathname)}</>;
};

export { Auth };
