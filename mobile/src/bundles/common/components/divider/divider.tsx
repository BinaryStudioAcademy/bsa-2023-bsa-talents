import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

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
