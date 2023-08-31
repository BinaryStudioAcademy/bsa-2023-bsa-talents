import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ImagePickerResponse } from 'react-native-image-picker';

import {
    Avatar,
    ImagePicker,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type AvatarProperties } from '~/bundles/common/types/types';

import { styles } from './style';

type AvatarPickerProperties = {
    buttonStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
} & AvatarProperties;
const AvatarPicker: React.FC<AvatarPickerProperties> = ({
    buttonStyle,
    containerStyle,
    uri,
    ...props
}) => {
    const [avatar, setAvatar] = useState<undefined | string>();
    const handleImageLoad = useCallback(
        async (payload: Promise<ImagePickerResponse>) => {
            const { assets, didCancel } = await payload;
            if (didCancel ?? !assets) {
                return;
            }
            const [image] = assets;
            setAvatar(image.uri ?? uri);
        },
        [uri],
    );

    const onImageLoad = (payload: Promise<ImagePickerResponse>): void => {
        handleImageLoad(payload).catch(() => {
            // TODO: Notify error
        });
    };

    return (
        <View
            style={[
                styles.container,
                globalStyles.alignItemsCenter,

                containerStyle,
            ]}
        >
            <Avatar {...props} uri={avatar ?? uri} />
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
