import './styles.scss';

import { Notifications } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useLocation,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';

import { AuthLayout } from '../components/auth-layout/auth-layout.js';
import { SignInForm, SignUpForm } from '../components/components.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { currentUser } = useAppSelector(({ auth }) => ({
        currentUser: auth.currentUser,
    }));

    useEffect(() => {
        if (currentUser) {
            navigate(AppRoute.TALENT);
        }
    }, [currentUser, navigate]);

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return (
                    <>
                        <AuthLayout>
                            <SignInForm onSubmit={handleSignInSubmit} />
                        </AuthLayout>
                        <Notifications />
                    </>
                );
            }
            case AppRoute.SIGN_UP: {
                return (
                    <>
                        <AuthLayout>
                            <SignUpForm onSubmit={handleSignUpSubmit} />
                        </AuthLayout>
                        <Notifications />
                    </>
                );
            }
        }

        return null;
    };

    return <>{getScreen(pathname)}</>;
};

export { Auth };
