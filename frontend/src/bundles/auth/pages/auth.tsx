import './styles.scss';

import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

import { AuthLayout } from '../components/auth-layout/auth-layout.js';
import { SignInForm, SignUpForm } from '../components/components.js';
import { actions as authActions } from '../store/auth.js';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback((): void => {
        // handle sign in
    }, []);

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
                    <AuthLayout>
                        <SignInForm onSubmit={handleSignInSubmit} />
                    </AuthLayout>
                );
            }
            case AppRoute.SIGN_UP: {
                return (
                    <AuthLayout>
                        <SignUpForm onSubmit={handleSignUpSubmit} />
                    </AuthLayout>
                );
            }
        }

        return null;
    };

    return <>{getScreen(pathname)}</>;
};

export { Auth };
