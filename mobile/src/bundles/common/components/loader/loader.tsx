import React from 'react';

import {
    ActivityIndicator,
    View,
} from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';

import { styles } from './styles';

type LoaderProperties = {
    size: 'small' | 'large';
};
const Loader: React.FC<LoaderProperties> = ({ size }) => {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator color={Color.PRIMARY} size={size} />
        </View>
    );
};

export { Loader };
