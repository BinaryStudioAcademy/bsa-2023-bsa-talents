import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ImagePickerResponse } from 'react-native-image-picker';

import {
    Avatar,
    ImagePicker,
    Text,
    View,
} from '~/bundles/common/components/components';
import { ErrorMessages, TextCategory } from '~/bundles/common/enums/enums';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type AvatarProperties } from '~/bundles/common/types/types';
import { notifications } from '~/framework/notifications/notifications';

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
            try {
                const { assets, didCancel } = await payload;
                if (didCancel ?? !assets) {
                    return;
                }
                const [image] = assets;
                setAvatar(image.uri ?? uri);
            } catch (error) {
                if (error instanceof Error) {
                    notifications.showError({ title: error.message });
                    return;
                }
                notifications.showError({ title: ErrorMessages.UNKNOWN_ERROR });
            }
        },
        [uri],
    );

    return (
        <View style={[globalStyles.alignItemsCenter, containerStyle]}>
            <Avatar {...props} uri={avatar ?? uri} />
            <Text style={globalStyles.mv10} category={TextCategory.H6}>
                Upload a new photo
            </Text>
            <ImagePicker
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onImageLoad={handleImageLoad}
                label="Choose photo"
                containerStyle={buttonStyle}
            />
        </View>
    );
};

export { AvatarPicker };
