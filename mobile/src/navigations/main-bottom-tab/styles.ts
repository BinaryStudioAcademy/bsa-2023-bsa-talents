import { type BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { Color } from '~/bundles/common/enums/enums';

const bottomTabStyles: BottomTabNavigationOptions = {
    headerShown: false,

    tabBarActiveTintColor: '#FFFFFF',
    tabBarInactiveTintColor: Color.TEXT2,
    tabBarStyle: {
        backgroundColor: Color.PRIMARY,
        height: 50,
    },
    tabBarLabel: () => null,
};

export { bottomTabStyles };
