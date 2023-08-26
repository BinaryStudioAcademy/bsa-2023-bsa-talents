import {
    type DrawerContentComponentProps,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text } from '~/bundles/common/components/components';

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
                const number = 1;

                const onPress = (): void => {
                    const event = navigation.emit({
                        type: 'drawerItemPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable key={index} onPress={onPress}>
                        <Text>Step {index + number}</Text>
                        <Text>{route.name}</Text>
                    </Pressable>
                );
            })}
        </DrawerContentScrollView>
    );
};

export { Steps };
