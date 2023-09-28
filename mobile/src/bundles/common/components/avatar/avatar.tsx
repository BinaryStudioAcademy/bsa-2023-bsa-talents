import React from 'react';

import {
    Image,
    MaterialIcon,
    Text,
} from '~/bundles/common/components/components';
import { IconName, PhotoType } from '~/bundles/common/enums/enums';
import {
    getAvatarInitials,
    getAvatarStyles,
} from '~/bundles/common/helpers/helpers';
import { useMemo } from '~/bundles/common/hooks/hooks';
import {
    type CustomPhotoStyle,
    type PhotoProperties,
    type ValueOf,
} from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties = {
    customPhotoStyle?: CustomPhotoStyle;
    defaultIcon?: ValueOf<typeof IconName>;
} & PhotoProperties;

const Avatar: React.FC<Properties> = ({
    customPhotoStyle,
    avatarSize = PhotoType.MEDIUM,
    fullName,
    uri,
    defaultIcon = IconName.PERSON,
}) => {
    const { photoShape } = customPhotoStyle ?? {};
    const avatarStyles = useMemo(
        () => getAvatarStyles(avatarSize),
        [avatarSize],
    );

    if (uri) {
        return (
            <Image
                style={[styles.img, avatarStyles.size, photoShape]}
                source={{ uri }}
            />
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
        <MaterialIcon
            size={avatarStyles.iconSize}
            style={[styles.icon, avatarStyles.size, photoShape]}
            name={defaultIcon}
        />
    );
};

export { Avatar };
