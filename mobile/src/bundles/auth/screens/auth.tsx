import React from 'react';

import { actions as authActions } from '~/bundles/auth/store';
import { Button, Text } from '~/bundles/common/components/components';
import { ButtonType, RootScreenName } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppRoute,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { actions as userActions } from '~/bundles/users/store';
import { type UserSignUpRequestDto } from '~/bundles/users/users';

import { SignInForm, SignUpForm } from '../components/components';

const Auth: React.FC = () => {
    const { name } = useAppRoute();
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));

    const isSignUpScreen = name === RootScreenName.SIGN_UP;

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
            case RootScreenName.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case RootScreenName.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        <>
            <Text>state: {dataStatus}</Text>
            <Button buttonType={ButtonType.FILLED} label={'Filled'} />
            <Button buttonType={ButtonType.OUTLINE} label={'Outlined'} />
            <Button
                buttonType={ButtonType.GHOST}
                label={'GHOST'}
                iconName={'add'}
            />

            {getScreen(name)}
        </>
    );
};

export { Auth };
