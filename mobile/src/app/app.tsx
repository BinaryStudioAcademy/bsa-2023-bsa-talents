import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React, { type FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Provider as StoreProvider } from 'react-redux';

import { useEffect } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { store } from '~/framework/store/store';
import { Root as RootNavigation } from '~/navigations/navigations';

const App: FC = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <StoreProvider store={store.instance}>
            <GestureHandlerRootView style={globalStyles.flex1}>
                <NavigationContainer>
                    <RootNavigation />
                </NavigationContainer>
            </GestureHandlerRootView>
        </StoreProvider>
    );
};

export { App };
