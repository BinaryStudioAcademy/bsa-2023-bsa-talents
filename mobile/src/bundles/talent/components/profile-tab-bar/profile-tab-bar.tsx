import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    CommunityIcon,
    Divider,
    Pressable,
    StatusBar,
    Text,
    VerificationMessage,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import { TextCategory } from '~/bundles/common/enums/styles/text-category.enum';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles/global-styles';
import { ProfileDetailsScreenName } from '~/bundles/talent/enums/enums';
import { type MaterialTopTabBarProps } from '~/bundles/talent/types/types';

import { ProfileTabBarItem } from './profile-top-bar-item/profile-top-bar-item';
import { styles } from './styles';

const ProfileTabBar: React.FC<MaterialTopTabBarProps> = ({
    navigation,
    state,
}) => {
    const dispatch = useAppDispatch();
    const { isApproved } =
        useAppSelector(({ common }) => common.onboardingData) ?? {};

    const handleLogout = (): void => {
        void dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.pv25,
                    globalStyles.pl25,
                    globalStyles.pr10,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.H3}>Your profile</Text>
                {!isApproved && <VerificationMessage />}
                <Pressable onPress={handleLogout}>
                    <CommunityIcon
                        name={IconName.LOGOUT}
                        size={30}
                        color={Color.TEXT2}
                    />
                </Pressable>
            </View>
            <Divider />
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentCenter,
                    globalStyles.p15,
                    styles.navigations,
                ]}
            >
                {state.routes.map(({ name, key }, index) => {
                    const isFocused = state.index === index;
                    const onPress = (): void => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(name, {
                                merge: true,
                            });
                        }
                    };

                    const routeName =
                        name === ProfileDetailsScreenName.PROFILE
                            ? 'Profile'
                            : name;

                    return (
                        <ProfileTabBarItem
                            onPress={onPress}
                            key={key}
                            routeName={routeName}
                            isFocused={isFocused}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export { ProfileTabBar };
