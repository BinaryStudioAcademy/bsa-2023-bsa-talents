import { PhotoType, TextCategory } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

const SMALL_SIZE = 40;
const MEDIUM_SIZE = 60;
const LARGE_SIZE = 100;
const DIVIDER = 2;

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

const getIconStyles = (iconSize: number): IconStyle => {
    return {
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / DIVIDER,
    };
};

const avatarStylesMap: Record<ValueOf<typeof PhotoType>, AvatarStyles> = {
    [PhotoType.SMALL]: {
        size: getIconStyles(SMALL_SIZE),
        font: TextCategory.H6,
        iconSize: SMALL_SIZE,
    },
    [PhotoType.MEDIUM]: {
        size: getIconStyles(MEDIUM_SIZE),
        font: TextCategory.H3,
        iconSize: MEDIUM_SIZE,
    },
    [PhotoType.LARGE]: {
        size: getIconStyles(LARGE_SIZE),
        font: TextCategory.H1,
        iconSize: LARGE_SIZE,
    },
};

const getAvatarStyles = (
    avatarSize: ValueOf<typeof PhotoType> = PhotoType.MEDIUM,
): AvatarStyles => {
    return avatarStylesMap[avatarSize];
};

export { getAvatarStyles };
