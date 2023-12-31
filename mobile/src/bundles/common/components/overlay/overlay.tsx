import React from 'react';

import {
    ActivityIndicator,
    View,
} from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type OverlayProperties = {
    isActive: boolean;
    color?: string;
};
const Overlay: React.FC<OverlayProperties> = ({
    isActive,
    color = Color.PRIMARY,
}) => {
    if (!isActive) {
        return null;
    }
    return (
        <View
            pointerEvents="box-only"
            style={[
                globalStyles.width100,
                globalStyles.height100,
                globalStyles.justifyContentCenter,
                styles.wrapper,
            ]}
        >
            <ActivityIndicator color={color} size="large" />
        </View>
    );
};

export { Overlay };
