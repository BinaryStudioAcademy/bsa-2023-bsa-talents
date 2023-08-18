import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { Auth } from '~/bundles/auth/screens/auth';
import { RootScreenName } from '~/bundles/common/enums/enums';
import { type RootNavigationParameterList } from '~/bundles/common/types/types';

const NativeStack = createNativeStackNavigator<RootNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const Root: React.FC = () => {
    return (
        <NativeStack.Navigator screenOptions={screenOptions}>
            <NativeStack.Screen
                name={RootScreenName.SIGN_IN}
                component={Auth}
            />
            <NativeStack.Screen
                name={RootScreenName.SIGN_UP}
                component={Auth}
            />
        </NativeStack.Navigator>
    );
};

export { Root };
