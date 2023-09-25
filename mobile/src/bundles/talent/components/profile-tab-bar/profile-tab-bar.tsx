import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/styles/text-category.enum';
import { globalStyles } from '~/bundles/common/styles/global-styles/global-styles';
import { ProfileDetailsScreenName } from '~/bundles/talent/enums/enums';
import { type MaterialTopTabBarProps } from '~/bundles/talent/types/types';

import { ProfileTabBarItem } from './profile-top-bar-item/profile-top-bar-item';
import { styles } from './styles';

const ProfileTabBar: React.FC<MaterialTopTabBarProps> = ({
    navigation,
    state,
}) => {
    return (
        <View style={styles.container}>
            <Text category={TextCategory.H3} style={globalStyles.p15}>
                Your Profile
            </Text>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentCenter,
                    globalStyles.mb15,
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
