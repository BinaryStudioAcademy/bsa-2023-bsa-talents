import React from 'react';

import { AuthWrapper, SignInForm } from '~/bundles/auth/components/components';
import { actions as authActions } from '~/bundles/auth/store';
import { type UserSignInRequestDto } from '~/bundles/auth/types/types';
import { Overlay } from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => auth);
    const isPendingAuth = dataStatus === DataStatus.PENDING;

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    return (
        <>
            <Overlay isActive={isPendingAuth} />
            <AuthWrapper>
                <SignInForm onSubmit={handleSignInSubmit} />
            </AuthWrapper>
        </>
    );
};

export { SignIn };
