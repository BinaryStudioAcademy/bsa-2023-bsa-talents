import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image, Text, View } from '~/bundles/common/components/components';
import {
    IconName,
    PhotoType,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { getAvatarInitials } from '~/bundles/common/helpers/helpers';
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
    const { defaultPhotoContainer, defaultPhoto, photoShape } =
        customPhotoStyle ?? {};
    const avatarStyles = useMemo(() => {
        switch (avatarSize) {
            case PhotoType.SMALL: {
                return {
                    size: styles.small,
                    font: TextCategory.H6,
                    iconSize: 40,
                };
            }
            case PhotoType.LARGE: {
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
        <View style={defaultPhotoContainer}>
            <Icon
                size={avatarStyles.iconSize}
                style={[styles.icon, avatarStyles.size, defaultPhoto]}
                name={defaultIcon}
            />
        </View>
    );
};

export { Avatar };
