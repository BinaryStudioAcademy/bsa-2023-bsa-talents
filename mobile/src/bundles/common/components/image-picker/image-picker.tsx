import React from 'react';

import {
    Button,
    Modal,
    Text,
    View,
} from '~/bundles/common/components/components';
import { PermissionsAndroid } from '~/bundles/common/constants/constants';
import {
    ButtonType,
    ErrorMessage,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    launchCamera,
    launchImageLibrary,
} from '~/bundles/common/helpers/helpers';
import { useCallback, useVisibility } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type ImagePickerResponse,
    type StyleProp,
    type ViewStyle,
} from '~/bundles/common/types/types';
import { notifications } from '~/framework/notifications/notifications';

import { styles } from './styles';

type ImagePickerProperties = {
    shouldHideButton?: boolean;
    toggleImagePickerVisibility?: () => void;
    label?: string;
    onImageLoad: (payload: Promise<ImagePickerResponse>) => void;
    containerStyle?: StyleProp<ViewStyle>;
};

const ImagePicker: React.FC<ImagePickerProperties> = ({
    shouldHideButton = false,
    toggleImagePickerVisibility,
    label,
    onImageLoad,
    containerStyle,
}) => {
    const { isVisible, handleToggleVisibility } =
        useVisibility(shouldHideButton);

    const getImageFromLibrary = useCallback((): void => {
        toggleImagePickerVisibility?.();
        handleToggleVisibility();
        const result = launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
        });
        onImageLoad(result);
    }, [handleToggleVisibility, onImageLoad, toggleImagePickerVisibility]);

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
            handleToggleVisibility();
            toggleImagePickerVisibility?.();
        } catch (error) {
            if (error instanceof Error) {
                notifications.showError({ title: error.message });
            }
            notifications.showError({ title: ErrorMessage.UNKNOWN_ERROR });
        }
    }, [handleToggleVisibility, onImageLoad, toggleImagePickerVisibility]);

    const imageCameraHandler = useCallback((): void => {
        void getImageFromCamera();
    }, [getImageFromCamera]);

    const onPickerPress = (): void => {
        handleToggleVisibility();
    };

    const onPopUpClose = (): void => {
        handleToggleVisibility;
        toggleImagePickerVisibility?.();
    };

    return (
        <>
            <Modal visible={isVisible} onClose={onPopUpClose}>
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
            {!shouldHideButton && (
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
