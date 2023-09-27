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

const getAvatarStyles = (
    avatarSize: ValueOf<typeof PhotoType>,
): AvatarStyles => {
    switch (avatarSize) {
        case PhotoType.SMALL: {
            return {
                size: getIconStyles(SMALL_SIZE),
                font: TextCategory.H6,
                iconSize: SMALL_SIZE,
            };
        }
        case PhotoType.MEDIUM: {
            return {
                size: getIconStyles(MEDIUM_SIZE),
                font: TextCategory.H3,
                iconSize: MEDIUM_SIZE,
            };
        }
        case PhotoType.LARGE: {
            return {
                size: getIconStyles(LARGE_SIZE),
                font: TextCategory.H1,
                iconSize: LARGE_SIZE,
            };
        }
    }
};

export { getAvatarStyles };
