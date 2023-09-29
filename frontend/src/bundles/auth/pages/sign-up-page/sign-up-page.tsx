import {
    AuthLayout,
    SignUpForm,
} from '~/bundles/auth/components/components.js';
import { actions as authActions } from '~/bundles/auth/store/auth.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import {
    useAppDispatch,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { UserRole, type UserSignUpRequestDto } from '~/bundles/users/users.js';
import { configureString } from '~/helpers/helpers.js';

const SignUpPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const navigateUser = useCallback(
        ({ role }: { role: ValueOf<typeof UserRole> }): void => {
            switch (role) {
                case UserRole.TALENT: {
                    navigate(
                        configureString(AppRoute.TALENT_STEP, {
                            step: StepsRoute.STEP_01,
                        }),
                    );
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

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload))
                .unwrap()
                .then(() => {
                    navigateUser(payload);
                })
                .catch(() => {
                    navigate(AppRoute.SIGN_UP);
                });
        },
        [dispatch, navigate, navigateUser],
    );
    return (
        <AuthLayout>
            <SignUpForm onSubmit={handleSignUpSubmit} />
        </AuthLayout>
    );
};

export { SignUpPage };
