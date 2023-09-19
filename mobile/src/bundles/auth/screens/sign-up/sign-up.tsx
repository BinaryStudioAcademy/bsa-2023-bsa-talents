import React from 'react';

import { AuthWrapper, SignUpForm } from '~/bundles/auth/components/components';
import { actions as authActions } from '~/bundles/auth/store';
import { type UserSignUpRequestDto } from '~/bundles/auth/types/types';
import { Overlay } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => auth);
    const isPendingAuth = dataStatus === DataStatus.PENDING;

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    return (
        <>
            <Overlay isActive={isPendingAuth} />
            <AuthWrapper>
                <SignUpForm onSubmit={handleSignUpSubmit} />
            </AuthWrapper>
        </>
    );
};

export { SignUp };
