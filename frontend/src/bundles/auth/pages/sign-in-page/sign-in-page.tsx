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
import { type ValueOf } from '~/bundles/common/types/types.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { getStepRoute } from '~/bundles/talent-onboarding/helpers/helpers.js';
import { UserRole, type UserSignInRequestDto } from '~/bundles/users/users.js';

const SignInPage: React.FC = () => {
    const dispatch = useAppDispatch();

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
    return (
        <AuthLayout>
            <SignInForm onSubmit={handleSignInSubmit} />
        </AuthLayout>
    );
};

export { SignInPage };
