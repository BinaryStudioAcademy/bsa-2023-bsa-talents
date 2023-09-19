import React from 'react';

import { SignIn, SignUp } from '~/bundles/auth/screens/screens';
import { AuthScreenName } from '~/bundles/common/enums/enums';
import { createNativeStackNavigator } from '~/bundles/common/helpers/helpers';
import {
    type AuthNavigationParameterList,
    type NativeStackNavigationOptions,
} from '~/bundles/common/types/types';

const AuthStack = createNativeStackNavigator<AuthNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const AuthNavigator: React.FC = () => {
    return (
        <AuthStack.Navigator screenOptions={screenOptions}>
            <AuthStack.Screen
                name={AuthScreenName.SIGN_IN}
                component={SignIn}
            />
            <AuthStack.Screen
                name={AuthScreenName.SIGN_UP}
                component={SignUp}
            />
        </AuthStack.Navigator>
    );
};

export { AuthNavigator };
