import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { type StyleProp, type ViewStyle } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { type ImagePickerResponse } from 'react-native-image-picker';

import { Button } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';

type ImagePickerProperties = {
    label: string;
    containerStyle?: StyleProp<ViewStyle>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getImageFromLibrary = async (): Promise<ImagePickerResponse> => {
    return await launchImageLibrary({ mediaType: 'photo' });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getImageFromCamera = async (): Promise<ImagePickerResponse> => {
    const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
    );
    if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
        return await launchCamera({
            mediaType: 'photo',
            saveToPhotos: true,
            includeBase64: false,
        });
    }
    throw new Error('Permissions error ');
};
const ImagePicker: React.FC<ImagePickerProperties> = ({
    label,
    containerStyle,
}) => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,unicorn/consistent-function-scoping
    const onPickerPress = () => {
        try {
            // TODO: Create popup with choose image picker and set image
        } catch {
            // TODO: Error notification
        }
    };
    return (
        <Button
            buttonType={ButtonType.OUTLINE}
            label={label}
            onPress={onPickerPress}
            style={containerStyle}
        />
    );
};

export { ImagePicker };
