import React from 'react';

import { View } from '~/bundles/common/components/components';

import { globalStyles } from '../../styles/global-styles';
import { styles } from './styles';

type OverlayProperties = {
    isActive: boolean;
};
const Button: React.FC<OverlayProperties> = ({ isActive }) => {
    if (!isActive) {
        return false;
    }
    return (
        <View
            style={[
                globalStyles.width100,
                globalStyles.height100,
                styles.wrapper,
            ]}
        ></View>
    );
};

export { Button };
