import { actions as authActions } from '~/bundles/auth/store/auth.js';
import {
    useAppDispatch,
    useCallback,
    useParameters,
} from '~/bundles/common/hooks/hooks.js';
import { type UserResetPasswordDto } from '~/bundles/users/users.js';

import { AuthLayout, ResetPassword } from '../../components/components.js';

const ResetPasswordPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { token } = useParameters();

    const handleResetPasswordSubmit = useCallback(
        (payload: UserResetPasswordDto): void => {
            if (token) {
                const safeEncodedToken = token
                    .replaceAll('-', '+')
                    .replaceAll('_', '/');
                const decodedToken = atob(safeEncodedToken);

                void dispatch(
                    authActions.resetPassword({
                        resetToken: decodedToken,
                        ...payload,
                    }),
                );
            }
        },
        [dispatch, token],
    );

    return (
        <AuthLayout>
            <ResetPassword onSubmit={handleResetPasswordSubmit} />
        </AuthLayout>
    );
};

export { ResetPasswordPage };
