import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Avatar, Text } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { type AvatarProperty } from '~/bundles/common/types/types';
import { ImagePicker } from '~/bundles/users/components/image-picker/image-picker';

type AvatarPickerProperties = {
    buttonStyle: StyleProp<ViewStyle>;
} & AvatarProperty;
const AvatarPicker: React.FC<AvatarPickerProperties> = ({
    buttonStyle,
    ...props
}) => {
    return (
        <>
            <Avatar {...props} />
            <Text category={TextCategory.H6}>Upload a new photo</Text>
            <ImagePicker label="Choose photo" containerStyle={buttonStyle} />
        </>
    );
};

export { AvatarPicker };
