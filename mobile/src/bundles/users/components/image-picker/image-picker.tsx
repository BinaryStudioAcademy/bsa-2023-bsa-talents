import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { type ImagePickerResponse } from 'react-native-image-picker';

import { Button, Modal } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

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

    const getImageFromCamera = useCallback((): void => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        })
            .then((grantedCamera) => {
                if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
                    const result = launchCamera({
                        mediaType: 'photo',
                        saveToPhotos: true,
                    });
                    onImageLoad(result);
                }
                setIsPopUpActive(false);
            })
            .catch(() => {
                /*TODO: Notification error*/
            });
    }, [onImageLoad]);

    const onPickerPress = useCallback(() => {
        setIsPopUpActive(true);
    }, []);

    const onPopUpClose = useCallback(() => {
        setIsPopUpActive(false);
    }, []);

    return (
        <>
            <Modal visible={isPopUpActive} onClose={onPopUpClose}>
                <Button label="Camera" onPress={getImageFromCamera} />
                <Button label="Library" onPress={getImageFromLibrary} />
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
