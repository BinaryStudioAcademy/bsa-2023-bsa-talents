import React from 'react';

import { actions as authActions } from '~/bundles/auth/store';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/auth/types/types';
import { Overlay } from '~/bundles/common/components/components';
import { AuthScreenName, DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks';

import { AuthWrapper, SignInForm, SignUpForm } from '../components/components';

const Auth: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));

    const isPendingAuth = dataStatus === DataStatus.PENDING;

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );
    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AuthScreenName.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AuthScreenName.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }
        return null;
    };

    return (
        <>
            <Overlay isActive={isPendingAuth} />
            <AuthWrapper>{getScreen(name)}</AuthWrapper>
        </>
    );
};

export { Auth };
