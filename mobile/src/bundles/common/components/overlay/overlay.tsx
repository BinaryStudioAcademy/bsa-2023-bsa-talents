import React from 'react';

import {
    ActivityIndicator,
    View,
} from '~/bundles/common/components/components';

import { Color } from '../../enums/enums';
import { globalStyles } from '../../styles/global-styles';
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
        return false;
    }
    return (
        <View
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
