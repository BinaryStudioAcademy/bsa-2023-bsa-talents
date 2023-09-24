import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    useAppDispatch,
    useCallback,
    useParameters,
} from '~/bundles/common/hooks/hooks.js';

import { AuthLayout, ResetPassword } from '../../components/components.js';
import { type UserResetPasswordDto } from '../../types/types.js';

const ResetPasswordPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { token } = useParameters();

    const handleSignInSubmit = useCallback(
        (payload: UserResetPasswordDto): void => {
            if (token) {
                void dispatch(
                    authActions.resetPassword({
                        resetToken: token,
                        ...payload,
                    }),
                );
            }
        },
        [dispatch, token],
    );

    return (
        <AuthLayout>
            <ResetPassword onSubmit={handleSignInSubmit} />
        </AuthLayout>
    );
};

export { ResetPasswordPage };
