import {
    IconSize,
    PhotoType,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

type IconStyle = {
    width: number;
    height: number;
    borderRadius: number;
};

type AvatarStyles = {
    size: IconStyle;
    font: ValueOf<typeof TextCategory>;
    iconSize: number;
};

const DIVIDER = 2;

const getIconStyles = (iconSize: number): IconStyle => {
    return {
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / DIVIDER,
    };
};

const avatarStylesMap: Record<ValueOf<typeof PhotoType>, AvatarStyles> = {
    [PhotoType.SMALL]: {
        size: getIconStyles(IconSize.SMALL),
        font: TextCategory.H6,
        iconSize: IconSize.SMALL,
    },
    [PhotoType.MEDIUM]: {
        size: getIconStyles(IconSize.MEDIUM),
        font: TextCategory.H3,
        iconSize: IconSize.MEDIUM,
    },
    [PhotoType.LARGE]: {
        size: getIconStyles(IconSize.LARGE),
        font: TextCategory.H1,
        iconSize: IconSize.LARGE,
    },
};

const getAvatarStyles = (
    avatarSize: ValueOf<typeof PhotoType> = PhotoType.MEDIUM,
): AvatarStyles => {
    return avatarStylesMap[avatarSize];
};

export { getAvatarStyles };
