import {
    type ImageStyle,
    type StyleProp,
    type ViewStyle,
} from '~/bundles/common/components/components';

type CustomPhotoStyle = StyleProp<ViewStyle> &
    Partial<{
        defaultPhotoContainer: StyleProp<ViewStyle>;
        defaultPhoto: StyleProp<ImageStyle>;
        photoShape: StyleProp<ImageStyle>;
    }>;

export { type CustomPhotoStyle };
