import {
    AuthLayout,
    SignUpForm,
} from '~/bundles/auth/components/components.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

const SignUpPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );
    return (
        <AuthLayout>
            <SignUpForm onSubmit={handleSignUpSubmit} />
        </AuthLayout>
    );
};

export { SignUpPage };
