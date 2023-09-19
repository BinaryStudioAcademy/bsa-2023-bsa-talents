import 'fast-text-encoding';

import React, { type FC } from 'react';
import { Provider as StoreProvider } from 'react-redux';

import {
    GestureHandlerRootView,
    LostConnectionModal,
    NavigationContainer,
    SplashScreen,
    Toast,
} from '~/bundles/common/components/components';
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
            <LostConnectionModal />
            <Toast />
        </StoreProvider>
    );
};

export { App };
