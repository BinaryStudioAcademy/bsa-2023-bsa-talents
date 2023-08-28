import React from 'react';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ImagePicker } from '~/bundles/users/components/image-picker/image-picker';

const AvatarPicker: React.FC = () => {
    return (
        <View>
            {/* TODO: Add Avatar */}
            <Text category={TextCategory.H6}>Upload a new photo</Text>
            <ImagePicker
                label="Choose photo"
                containerStyle={[globalStyles.m25]}
            />
        </View>
    );
};

export { AvatarPicker };
