import React from 'react';

import { actions as authActions } from '~/bundles/auth/store';
import { AuthScreenName } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { actions as userActions } from '~/bundles/users/store';
import { type UserSignUpRequestDto } from '~/bundles/users/users';

import { AuthWrapper, SignInForm, SignUpForm } from '../components/components';

const Auth: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();

    const isSignUpScreen = name === AuthScreenName.SIGN_UP;

    useEffect(() => {
        if (isSignUpScreen) {
            void dispatch(userActions.loadAll());
        }
    }, [isSignUpScreen, dispatch]);

    const handleSignInSubmit = useCallback(() => {
        // TODO: handle sign in
    }, []);

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AuthScreenName.SIGN_IN: {
                return (
                    <AuthWrapper>
                        <SignInForm onSubmit={handleSignInSubmit} />
                    </AuthWrapper>
                );
            }
            case AuthScreenName.SIGN_UP: {
                return (
                    <AuthWrapper>
                        <SignUpForm onSubmit={handleSignUpSubmit} />
                    </AuthWrapper>
                );
            }
        }

        return null;
    };

    return <>{getScreen(name)}</>;
};

export { Auth };
