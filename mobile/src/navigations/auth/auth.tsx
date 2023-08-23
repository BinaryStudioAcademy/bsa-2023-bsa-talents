import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { AuthScreenName } from '~/bundles/common/enums/enums';
import { type AuthNavigationParameterList } from '~/bundles/common/types/types';
import { BottomTab } from '~/navigations/navigations';

const NativeStack = createNativeStackNavigator<AuthNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const Auth: React.FC = () => {
    return (
        <NativeStack.Navigator screenOptions={screenOptions}>
            <NativeStack.Screen
                name={AuthScreenName.MAIN}
                component={BottomTab}
            />
        </NativeStack.Navigator>
    );
};

export { Auth };
