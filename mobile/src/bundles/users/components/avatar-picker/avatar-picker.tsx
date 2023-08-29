import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ImagePickerResponse } from 'react-native-image-picker';

import { Avatar, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { type AvatarProperty } from '~/bundles/common/types/types';
import { ImagePicker } from '~/bundles/users/components/image-picker/image-picker';

type AvatarPickerProperties = {
    buttonStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
} & AvatarProperty;
const AvatarPicker: React.FC<AvatarPickerProperties> = ({
    buttonStyle,
    containerStyle,
    uri,
    ...props
}) => {
    const [updateAvatar, setUpdateAvatar] = useState<undefined | string>();
    const onImageLoadHandler = useCallback(
        async (payload: Promise<ImagePickerResponse>) => {
            const { assets, didCancel } = await payload;
            if (didCancel ?? !assets) {
                return;
            }
            const [image] = assets;
            setUpdateAvatar(image.uri ?? uri);
        },
        [uri],
    );

    const onImageLoad = (payload: Promise<ImagePickerResponse>): void => {
        onImageLoadHandler(payload).catch(() => {
            // TODO: Notify error
        });
    };

    return (
        <View style={containerStyle}>
            <Avatar {...props} uri={updateAvatar ?? uri} />
            <Text category={TextCategory.H6}>Upload a new photo</Text>
            <ImagePicker
                onImageLoad={onImageLoad}
                label="Choose photo"
                containerStyle={buttonStyle}
            />
        </View>
    );
};

export { AvatarPicker };
