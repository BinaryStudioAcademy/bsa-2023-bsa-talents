import React from 'react';

import { Icon, Image, Text } from '~/bundles/common/components/components';
import {
    AvatarType,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { getAvatarInitials } from '~/bundles/common/helpers/helpers';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { type AvatarProperties } from '~/bundles/common/types/types';

import { styles } from './styles';

const Avatar: React.FC<AvatarProperties> = ({
    avatarSize = AvatarType.MEDIUM,
    fullName,
    uri,
}) => {
    const avatarStyles = useMemo(() => {
        switch (avatarSize) {
            case AvatarType.SMALL: {
                return {
                    size: styles.small,
                    font: TextCategory.H6,
                    iconSize: 40,
                };
            }
            case AvatarType.LARGE: {
                return {
                    size: styles.large,
                    font: TextCategory.H1,
                    iconSize: 100,
                };
            }
            default: {
                return {
                    size: styles.medium,
                    font: TextCategory.H3,
                    iconSize: 60,
                };
            }
        }
    }, [avatarSize]);

    if (uri) {
        return (
            <Image style={[styles.img, avatarStyles.size]} source={{ uri }} />
        );
    }
    if (fullName) {
        return (
            <Text
                category={avatarStyles.font}
                style={[styles.icon, styles.initials, avatarStyles.size]}
            >
                {getAvatarInitials(fullName)}
            </Text>
        );
    }
    return (
        <Icon
            size={avatarStyles.iconSize}
            style={[styles.icon, avatarStyles.size]}
            name={IconName.PERSON}
        />
    );
};

export { Avatar };
