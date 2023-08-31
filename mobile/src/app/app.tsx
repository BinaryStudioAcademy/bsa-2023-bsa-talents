import 'fast-text-encoding';

import { NavigationContainer } from '@react-navigation/native';
import React, { type FC } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider as StoreProvider } from 'react-redux';

import { globalStyles } from '~/bundles/common/styles/styles';
import { store } from '~/framework/store/store';
import { Root as RootNavigation } from '~/navigations/navigations';

const App: FC = () => {
    return (
        <StoreProvider store={store.instance}>
            <GestureHandlerRootView style={globalStyles.flex1}>
                <NavigationContainer>
                    <RootNavigation />
                </NavigationContainer>
            </GestureHandlerRootView>
            <Toast />
        </StoreProvider>
    );
};

export { App };
