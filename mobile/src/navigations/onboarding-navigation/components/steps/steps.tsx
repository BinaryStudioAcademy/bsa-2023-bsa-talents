import {
    type DrawerContentComponentProps,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { Step } from '../components';
import { styles } from './styles';

const Steps: React.FC<DrawerContentComponentProps> = (props) => {
    const { navigation, state } = props;

    return (
        <DrawerContentScrollView
            {...props}
            style={[globalStyles.m25, globalStyles.flex1]}
        >
            <Pressable
                onPress={(): void => {
                    navigation.closeDrawer();
                }}
                style={styles.button}
            >
                <Icon name={IconName.CLOSE} size={40} color={Color.INPUT} />
            </Pressable>
            <Text category={TextCategory.H2} style={styles.title}>
                Steps
            </Text>
            <View style={styles.verticalLine} />

            {state.routes.map((route, index) => {
                // TODO: add logic to step completion
                const isFocused = state.index === index;
                const routeName = route.name;
                const { isCompleted, disabled } = route.params;

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

                const stepState = {
                    COMPLETED: isCompleted,
                    FOCUSED: isFocused,
                    DISABLED: disabled,
                } as const;

                return (
                    <Step
                        key={route.key}
                        routeName={routeName}
                        onPress={onPress}
                        stepNumber={index}
                        stepState={stepState}
                    />
                );
            })}
        </DrawerContentScrollView>
    );
};

export { Steps };
