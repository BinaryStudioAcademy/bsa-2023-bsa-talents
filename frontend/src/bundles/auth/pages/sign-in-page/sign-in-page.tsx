import {
    AuthLayout,
    SignInForm,
} from '~/bundles/auth/components/components.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type UserSignInRequestDto } from '~/bundles/users/users.js';

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );
    return (
        <AuthLayout>
            <SignInForm onSubmit={handleSignInSubmit} />
        </AuthLayout>
    );
};

export { SignInPage };
