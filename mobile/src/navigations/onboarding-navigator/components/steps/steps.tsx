import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    Animated,
    Button,
    DrawerContentScrollView,
    Icon,
    interpolate,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    Color,
    IconName,
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useAnimatedStyle,
    useAppDispatch,
    useDrawerProgress,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type DrawerContentComponentProps,
    type TalentOnboardingRouteProperties,
    type ValueOf,
} from '~/bundles/common/types/types';
import { Step } from '~/navigations/onboarding-navigator/components/step/step';

import { ANIMATION_VALUES } from './constants/constants';
import { styles } from './styles';

const {
    ICON_FINAL_X_COORDINATES,
    TEXT_FINAL_Y_COORDINATES,
    ICON_INITIAL_X_COORDINATES,
    TEXT_INITIAL_Y_COORDINATES,
    INITIAL_PROGRESS_VALUE,
    FINAL_PROGRESS_VALUE,
} = ANIMATION_VALUES;

const Steps: React.FC<DrawerContentComponentProps> = (props) => {
    const { navigation, state } = props;
    const progress = useDrawerProgress();
    const dispatch = useAppDispatch();

    const handleLogout = (): void => {
        void dispatch(logout());
    };

    const textAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            progress.value,
            [INITIAL_PROGRESS_VALUE, FINAL_PROGRESS_VALUE],
            [TEXT_INITIAL_Y_COORDINATES, TEXT_FINAL_Y_COORDINATES],
        );
        return {
            transform: [{ translateY }],
        };
    });

    const iconAnimatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            progress.value,
            [INITIAL_PROGRESS_VALUE, FINAL_PROGRESS_VALUE],
            [ICON_INITIAL_X_COORDINATES, ICON_FINAL_X_COORDINATES],
        );
        return {
            transform: [{ translateX }],
        };
    });

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
                <Animated.View style={iconAnimatedStyle}>
                    <Icon name={IconName.CLOSE} size={40} color={Color.INPUT} />
                </Animated.View>
            </Pressable>
            <Animated.View style={textAnimatedStyle}>
                <Text category={TextCategory.H2} style={styles.title}>
                    Steps
                </Text>
                <View style={styles.verticalLine} />

                {state.routes.map((route, index) => {
                    // TODO: add logic to step completion
                    const isFocused = state.index === index;
                    const routeName = route.name as ValueOf<
                        typeof TalentOnboardingScreenName
                    >;
                    const stepNumber = TalentOnboardingScreenNumber[routeName];
                    const { stepState } =
                        route.params as TalentOnboardingRouteProperties;

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
                            key={route.key}
                            routeName={routeName}
                            onPress={onPress}
                            stepNumber={stepNumber}
                            stepState={stepState}
                        />
                    );
                })}
            </Animated.View>
            <Animated.View style={iconAnimatedStyle}>
                <Button
                    label="Logout"
                    style={styles.logout}
                    onPress={handleLogout}
                />
            </Animated.View>
        </DrawerContentScrollView>
    );
};

export { Steps };
