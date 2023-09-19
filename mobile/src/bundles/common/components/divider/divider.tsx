import React from 'react';

import { View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type StyleProp, type ViewStyle } from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties = {
    containerStyle?: StyleProp<ViewStyle>;
};

const Divider: React.FC<Properties> = ({ containerStyle }) => {
    return (
        <View style={[globalStyles.width100, styles.line, containerStyle]} />
    );
};

export { Divider };
