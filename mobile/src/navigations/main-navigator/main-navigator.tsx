import {
    createNativeStackNavigator,
    type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';

import { MainScreenName } from '~/bundles/common/enums/enums';
import { type MainNavigationParameterList } from '~/bundles/common/types/types';

import { BottomTabNavigator } from '../bottom-tab/bottom-tab';

const MainStack = createNativeStackNavigator<MainNavigationParameterList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const MainNavigator: React.FC = () => {
    return (
        <MainStack.Navigator screenOptions={screenOptions}>
            <MainStack.Screen
                name={MainScreenName.MAIN}
                component={BottomTabNavigator}
            />
        </MainStack.Navigator>
    );
};

export { MainNavigator };
