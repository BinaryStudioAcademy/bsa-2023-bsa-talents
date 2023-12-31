import React from 'react';

import {
    Divider,
    LogoutButton,
    StatusBar,
    Text,
    VerificationMessage,
    View,
} from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { TextCategory } from '~/bundles/common/enums/styles/text-category.enum';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles/global-styles';
import { ProfileDetailsScreenName } from '~/bundles/talent/enums/enums';
import { type MaterialTopTabBarProps } from '~/bundles/talent/types/types';

import { ProfileTabBarItem } from './profile-top-bar-item/profile-top-bar-item';
import { styles } from './styles';

const ProfileTabBar: React.FC<MaterialTopTabBarProps> = ({
    navigation,
    state,
}) => {
    const { isApproved, publishedAt } =
        useAppSelector(({ common }) => common.onboardingData) ?? {};

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.p25,
                    globalStyles.pr10,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.H3}>Your profile</Text>
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentFlexEnd,
                        globalStyles.alignItemsCenter,
                    ]}
                >
                    {!isApproved && publishedAt && <VerificationMessage />}
                    <LogoutButton />
                </View>
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
