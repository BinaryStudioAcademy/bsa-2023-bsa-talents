import {
    type DrawerContentComponentProps,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable } from '~/bundles/common/components/components';

import { Step } from '../components';
import { styles } from './styles';

const Steps = (props: DrawerContentComponentProps): JSX.Element => {
    const { navigation, state } = props;

    return (
        <DrawerContentScrollView {...props} style={styles.con}>
            <Pressable
                onPress={(): void => {
                    navigation.closeDrawer();
                }}
                style={{
                    backgroundColor: '#000',
                    width: 30,
                    position: 'absolute',
                    right: 0,
                }}
            >
                <Icon name="alpha-x" size={40} color="#fff" />
            </Pressable>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const routeName = route.name;

                const onPress = (): void => {
                    const event = navigation.emit({
                        type: 'drawerItemPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(routeName);
                    }
                };

                return (
                    <Step
                        routeName={routeName}
                        onPress={onPress}
                        index={index}
                        isFocused={isFocused}
                    />
                );
            })}
        </DrawerContentScrollView>
    );
};

export { Steps };
