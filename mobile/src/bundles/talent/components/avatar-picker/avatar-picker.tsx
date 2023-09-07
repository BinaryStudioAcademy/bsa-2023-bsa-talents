import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ImagePickerResponse } from 'react-native-image-picker';

import {
    Avatar,
    ImagePicker,
    Text,
    View,
} from '~/bundles/common/components/components';
import { ErrorMessages, TextCategory } from '~/bundles/common/enums/enums';
import {
    useCallback,
    useFormController,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type AvatarProperties } from '~/bundles/common/types/types';
import { notifications } from '~/framework/notifications/notifications';

import { fileSizeValidation } from '../cv-and-contacts-form/helpers/file-size-validation';
import { imageTypeValidation } from '../cv-and-contacts-form/helpers/image-type-validation';

type AvatarPickerProperties<T extends FieldValues> = {
    buttonStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    control: Control<T, null>;
    name: FieldPath<T>;
    setErrorMessageFile: React.Dispatch<React.SetStateAction<string>>;
} & AvatarProperties;

const AvatarPicker = <T extends FieldValues>({
    control,
    name,
    buttonStyle,
    containerStyle,
    setErrorMessageFile,
    uri,
    ...props
}: AvatarPickerProperties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { onChange } = field;

    const [avatar, setAvatar] = useState<undefined | string>();

    const getLoadedImage = useCallback(
        async (payload: Promise<ImagePickerResponse>) => {
            try {
                const { assets, didCancel } = await payload;
                if (didCancel ?? !assets) {
                    return;
                }
                const [image] = assets;
                setAvatar(image.uri ?? uri);
                const validateSize =
                    image.fileSize && fileSizeValidation(image.fileSize);
                const validateType =
                    image.type && imageTypeValidation(image.type);

                setErrorMessageFile('');

                if (validateSize) {
                    setErrorMessageFile(validateSize);
                } else if (validateType) {
                    setErrorMessageFile(validateType);
                } else {
                    onChange({
                        size: image.fileSize,
                        uri: image.uri ?? uri,
                        type: image.type,
                    });
                }
            } catch (error) {
                if (error instanceof Error) {
                    notifications.showError({ title: error.message });
                    return;
                }
                notifications.showError({ title: ErrorMessages.UNKNOWN_ERROR });
            }
        },
        [onChange, setErrorMessageFile, uri],
    );

    const imageLoadHandler = useCallback(
        (payload: Promise<ImagePickerResponse>): void => {
            void getLoadedImage(payload);
        },
        [getLoadedImage],
    );

    return (
        <View style={[globalStyles.alignItemsCenter, containerStyle]}>
            <Avatar {...props} uri={avatar ?? uri} />
            <Text style={globalStyles.mv10} category={TextCategory.H6}>
                Upload a new photo
            </Text>
            <ImagePicker
                onImageLoad={imageLoadHandler}
                label="Choose photo"
                containerStyle={buttonStyle}
            />
        </View>
    );
};

export { AvatarPicker };
