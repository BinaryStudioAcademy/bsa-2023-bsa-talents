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
    label: string;
    onImageLoad: (payload: Promise<ImagePickerResponse>) => void;
    containerStyle?: StyleProp<ViewStyle>;
};
import { notifications } from '~/framework/notifications/notifications';

import { styles } from './styles';

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
                notifications.showMessage({
                    title: 'Camera permission denied.',
                    text: 'You can give permission in settings',
                });
            }
            setIsPopUpActive(false);
        } catch (error) {
            if (error instanceof Error) {
                notifications.showError(error.message);
            }
            notifications.showError(ErrorMessages.UNKNOWN_ERROR);
        }
    }, [onImageLoad]);

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
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onPress={getImageFromCamera}
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
