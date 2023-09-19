import {
    type ImageStyle,
    type StyleProp,
    type ViewStyle,
} from '~/bundles/common/types/types';

type CustomPhotoStyle = StyleProp<ViewStyle> &
    Partial<{
        defaultPhotoContainer: StyleProp<ViewStyle>;
        defaultPhoto: StyleProp<ImageStyle>;
        photoShape: StyleProp<ImageStyle>;
    }>;

export { type CustomPhotoStyle };
