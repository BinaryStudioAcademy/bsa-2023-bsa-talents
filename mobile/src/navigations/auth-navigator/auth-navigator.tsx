import React from 'react';

import { Auth } from '~/bundles/auth/screens/auth';
import { createNativeStackNavigator } from '~/bundles/common/components/components';
import { AuthScreenName } from '~/bundles/common/enums/enums';
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
            <AuthStack.Screen name={AuthScreenName.SIGN_IN} component={Auth} />
            <AuthStack.Screen name={AuthScreenName.SIGN_UP} component={Auth} />
        </AuthStack.Navigator>
    );
};

export { AuthNavigator };
