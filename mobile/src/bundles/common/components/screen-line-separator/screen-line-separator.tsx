import React from 'react';

import { View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const ScreenLineSeparator: React.FC = () => {
    return <View style={[globalStyles.width100, styles.line]} />;
};

export { ScreenLineSeparator };
