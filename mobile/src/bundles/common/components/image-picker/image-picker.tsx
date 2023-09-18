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
    ErrorMessages,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    launchCamera,
    launchImageLibrary,
} from '~/bundles/common/helpers/helpers';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type ImagePickerResponse,
    type StyleProp,
    type ViewStyle,
} from '~/bundles/common/types/types';
import { notifications } from '~/framework/notifications/notifications';

import { styles } from './styles';

type ImagePickerProperties = {
    label: string;
    onImageLoad: (payload: Promise<ImagePickerResponse>) => void;
    containerStyle?: StyleProp<ViewStyle>;
};

const ImagePicker: React.FC<ImagePickerProperties> = ({
    label,
    onImageLoad,
    containerStyle,
}) => {
    const [isPopUpActive, setIsPopUpActive] = useState(false);

    const getImageFromLibrary = useCallback((): void => {
        setIsPopUpActive(false);
        const result = launchImageLibrary({ mediaType: 'photo' });
        onImageLoad(result);
    }, [onImageLoad]);

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
        } catch (error) {
            if (error instanceof Error) {
                notifications.showError({ title: error.message });
            }
            notifications.showError({ title: ErrorMessages.UNKNOWN_ERROR });
        }
    }, [onImageLoad]);

    const imageCameraHandler = useCallback((): void => {
        void getImageFromCamera();
    }, [getImageFromCamera]);

    const onPickerPress = (): void => {
        setIsPopUpActive(true);
    };

    const onPopUpClose = (): void => {
        setIsPopUpActive(false);
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
            <Button
                buttonType={ButtonType.OUTLINE}
                label={label}
                onPress={onPickerPress}
                style={containerStyle}
            />
        </>
    );
};

export { ImagePicker };
