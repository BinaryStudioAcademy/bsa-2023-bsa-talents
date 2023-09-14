import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { type ImagePickerResponse } from 'react-native-image-picker';

import {
    Avatar,
    ImagePicker,
    Text,
    View,
} from '~/bundles/common/components/components';
import { AvatarType, TextCategory } from '~/bundles/common/enums/enums';
import { getErrorMessage } from '~/bundles/common/helpers/helpers';
import {
    useCallback,
    useFormController,
    useState,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type AvatarProperties } from '~/bundles/common/types/types';
import { ERROR_MESSAGE } from '~/bundles/talent/helpers/constants/constants';
import {
    checkIfFileSizeValid,
    checkIfImageTypeValid,
} from '~/bundles/talent/helpers/helpers';
import { notifications } from '~/framework/notifications/notifications';

type AvatarPickerProperties<T extends FieldValues> = {
    buttonStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    control: Control<T, null>;
    name: FieldPath<T>;
    isSingleAvatarView?: boolean;
} & AvatarProperties;

const AvatarPicker = <T extends FieldValues>({
    control,
    name,
    buttonStyle,
    containerStyle,
    uri,
    isSingleAvatarView,
    ...props
}: AvatarPickerProperties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;

    const [avatar, setAvatar] = useState<undefined | string>(uri ?? value?.uri);
    const { isVisible, toggleVisibility } = useVisibility(false);

    const getLoadedImage = useCallback(
        async (payload: Promise<ImagePickerResponse>) => {
            try {
                const { assets, didCancel } = await payload;
                if (didCancel ?? !assets) {
                    return;
                }
                const [image] = assets;

                const isSizeValid = checkIfFileSizeValid(image.fileSize);
                const isTypeValid = checkIfImageTypeValid(image.type);

                if (isSizeValid && isTypeValid) {
                    onChange({
                        size: image.fileSize,
                        uri: image.uri ?? uri,
                        type: image.type,
                    });
                    setAvatar(image.uri ?? uri);
                } else {
                    const messageFileSize = isSizeValid
                        ? ''
                        : ERROR_MESSAGE.SIZE;
                    const messageImageType = isTypeValid
                        ? ''
                        : ERROR_MESSAGE.IMAGE_TYPE;

                    notifications.showError({
                        title: messageFileSize || messageImageType,
                    });
                }
            } catch (error) {
                const errorMessage = getErrorMessage(error);
                notifications.showError({ title: errorMessage });
            }
        },
        [onChange, uri],
    );

    const imageLoadHandler = useCallback(
        (payload: Promise<ImagePickerResponse>): void => {
            void getLoadedImage(payload);
        },
        [getLoadedImage],
    );

    return (
        <View style={[globalStyles.alignItemsCenter, containerStyle]}>
            {isSingleAvatarView ? (
                <>
                    <TouchableWithoutFeedback onPress={toggleVisibility}>
                        <Avatar
                            {...props}
                            uri={avatar ?? uri}
                            avatarSize={AvatarType.LARGE}
                        />
                    </TouchableWithoutFeedback>
                    {isVisible && (
                        <ImagePicker
                            onImageLoad={imageLoadHandler}
                            isSingleAvatarView={isSingleAvatarView}
                            toggleImagePickerVisibility={toggleVisibility}
                            containerStyle={buttonStyle}
                        />
                    )}
                </>
            ) : (
                <>
                    <Avatar {...props} uri={avatar ?? uri} />
                    <Text style={globalStyles.mv10} category={TextCategory.H6}>
                        Upload a new photo
                    </Text>
                    <ImagePicker
                        onImageLoad={imageLoadHandler}
                        label="Choose photo"
                        containerStyle={buttonStyle}
                    />
                </>
            )}
        </View>
    );
};

export { AvatarPicker };
