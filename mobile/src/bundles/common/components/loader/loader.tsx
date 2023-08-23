import React from 'react';

import {
    ActivityIndicator,
    View,
} from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

type LoaderProperties = {
    size: 'small' | 'large';
};
const Loader: React.FC<LoaderProperties> = ({ size }) => {
    return (
        <View
            style={[
                globalStyles.flex1,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentCenter,
            ]}
        >
            <ActivityIndicator color={Color.PRIMARY} size={size} />
        </View>
    );
};

export { Loader };
