import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { type ImagePickerResponse } from 'react-native-image-picker';

import {
    Button,
    Modal,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    ErrorMessages,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type ImagePickerProperties = {
    isSingleAvatarView?: boolean;
    toggleImagePickerVisibility?: () => void;
    label?: string;
    onImageLoad: (payload: Promise<ImagePickerResponse>) => void;
    containerStyle?: StyleProp<ViewStyle>;
};
import { notifications } from '~/framework/notifications/notifications';

import { styles } from './styles';

const ImagePicker: React.FC<ImagePickerProperties> = ({
    isSingleAvatarView = false,
    toggleImagePickerVisibility,
    label,
    onImageLoad,
    containerStyle,
}) => {
    const [isPopUpActive, setIsPopUpActive] = useState(isSingleAvatarView);

    const getImageFromLibrary = useCallback((): void => {
        toggleImagePickerVisibility?.();
        setIsPopUpActive(false);
        const result = launchImageLibrary({ mediaType: 'photo' });
        onImageLoad(result);
    }, [onImageLoad, toggleImagePickerVisibility]);

    const getImageFromCamera = useCallback(async (): Promise<void> => {
        try {
            const grantedCamera = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
                const result = launchCamera({
                    mediaType: 'photo',
                    saveToPhotos: true,
                });
                onImageLoad(result);
            }
            if (grantedCamera === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                notifications.showError({
                    title: 'Camera permission denied.',
                    text: 'Please provide permission to access your camera in settings',
                });
            }
            setIsPopUpActive(false);
            toggleImagePickerVisibility?.();
        } catch (error) {
            if (error instanceof Error) {
                notifications.showError({ title: error.message });
            }
            notifications.showError({ title: ErrorMessages.UNKNOWN_ERROR });
        }
    }, [onImageLoad, toggleImagePickerVisibility]);

    const imageCameraHandler = useCallback((): void => {
        void getImageFromCamera();
    }, [getImageFromCamera]);

    const onPickerPress = (): void => {
        setIsPopUpActive(true);
    };

    const onPopUpClose = (): void => {
        setIsPopUpActive(false);
        toggleImagePickerVisibility?.();
    };

    return (
        <>
            <Modal visible={isPopUpActive} onClose={onPopUpClose}>
                <Text style={globalStyles.pb10} category={TextCategory.H5}>
                    You can either take a picture or select one from your
                    library
                </Text>
                <View style={[globalStyles.p25, styles.pop_up]}>
                    <Button
                        buttonType={ButtonType.OUTLINE}
                        label="Camera"
                        onPress={imageCameraHandler}
                    />
                    <Button
                        buttonType={ButtonType.OUTLINE}
                        label="Library"
                        onPress={getImageFromLibrary}
                    />
                </View>
            </Modal>
            {!isSingleAvatarView && (
                <Button
                    buttonType={ButtonType.OUTLINE}
                    label={label ?? 'Button'}
                    onPress={onPickerPress}
                    style={containerStyle}
                />
            )}
        </>
    );
};

export { ImagePicker };
