import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type UserForgotPasswordRequestDto } from '~/bundles/users/users.js';

import { AuthLayout, ForgotPassword } from '../../components/components.js';

const ForgotPasswordPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleForgotPasswordSubmit = useCallback(
        (payload: UserForgotPasswordRequestDto): void => {
            void dispatch(authActions.forgotPassword(payload));
        },
        [dispatch],
    );
    return (
        <AuthLayout>
            <ForgotPassword onSubmit={handleForgotPasswordSubmit} />
        </AuthLayout>
    );
};

export { ForgotPasswordPage };
