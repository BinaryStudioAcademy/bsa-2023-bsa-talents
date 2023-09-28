import {
    AuthLayout,
    SignInForm,
} from '~/bundles/auth/components/components.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignInRequestDto } from '~/bundles/users/users.js';

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload))
                .unwrap()
                .then(() => {
                    navigate(AppRoute.ROOT);
                });
        },
        [dispatch, navigate],
    );
    return (
        <AuthLayout>
            <SignInForm onSubmit={handleSignInSubmit} />
        </AuthLayout>
    );
};

export { SignInPage };
