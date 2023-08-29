import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { actions as signUpActions } from '~/bundles/sign-up/store/sign-up.js';
import { type UserSignUpStep1Dto } from '~/bundles/sign-up/types/types.js';

import { FirstStep } from './first-step.js';

type Properties = {
    test?: boolean;
};

const TestStep1: React.FC<Properties> = () => {
    const dispatch = useAppDispatch();

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpStep1Dto): void => {
            void dispatch(signUpActions.signUpStep1(payload));
        },
        [dispatch],
    );
    return <FirstStep onSubmit={handleSignUpSubmit} />;
};

export { TestStep1 };
