import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { type ImagePickerResponse } from 'react-native-image-picker';

import { Button, Modal, View } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type ImagePickerProperties = {
    label: string;
    onImageLoad: (payload: Promise<ImagePickerResponse>) => void;
    containerStyle?: StyleProp<ViewStyle>;
};
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

    const getImageFromCamera = useCallback((): void => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            .then((grantedCamera) => {
                if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
                    const result = launchCamera({
                        mediaType: 'photo',
                        saveToPhotos: true,
                    });
                    onImageLoad(result);
                }
                if (
                    grantedCamera === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
                ) {
                    // TODO: Notify about possibility to add permissions in settings
                }
                setIsPopUpActive(false);
            })
            .catch(() => {
                // TODO: Notification error
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
                <View style={[globalStyles.p25, styles.pop_up]}>
                    <Button
                        buttonType={ButtonType.OUTLINE}
                        label="Camera"
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
