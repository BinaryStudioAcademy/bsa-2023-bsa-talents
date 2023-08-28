import { type ImageStyle, type StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image, Text } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { AvatarType } from '~/bundles/common/enums/ui/avatar-type.enum';
import { getAvatarInitials } from '~/bundles/common/helpers/helpers';
import { useMemo } from '~/bundles/common/hooks/hooks';
import { type ValueOf } from '~/bundles/common/types/types';

import { styles } from './styles';

type AvatarSize = ValueOf<typeof AvatarType>;

type Properties = {
    avatarSize?: AvatarSize;
    fullName?: string;
    uri?: string;
};

const Avatar: React.FC<Properties> = ({
    avatarSize = AvatarType.MEDIUM,
    fullName,
    uri,
}) => {
    const sizeStyles: Record<
        AvatarSize,
        StyleProp<ImageStyle>
    > = useMemo(() => {
        return {
            [AvatarType.SMALL]: styles.small,
            [AvatarType.MEDIUM]: styles.medium,
            [AvatarType.LARGE]: styles.large,
        };
    }, []);
    const fontStyles = useMemo(() => {
        return {
            [AvatarType.SMALL]: TextCategory.H6,
            [AvatarType.MEDIUM]: TextCategory.H3,
            [AvatarType.LARGE]: TextCategory.H1,
        };
    }, []);
    const iconSizes = useMemo(() => {
        return {
            [AvatarType.SMALL]: 40,
            [AvatarType.MEDIUM]: 60,
            [AvatarType.LARGE]: 100,
        };
    }, []);
    if (uri) {
        return (
            <Image
                style={[styles.img, sizeStyles[avatarSize]]}
                source={{ uri }}
            />
        );
    }
    if (fullName) {
        return (
            <Text
                category={fontStyles[avatarSize]}
                style={[styles.icon, styles.initials, sizeStyles[avatarSize]]}
            >
                {getAvatarInitials(fullName)}
            </Text>
        );
    }
    return (
        <Icon
            size={iconSizes[avatarSize]}
            style={[styles.icon, sizeStyles[avatarSize]]}
            name="person"
        />
    );
};

export { Avatar };
