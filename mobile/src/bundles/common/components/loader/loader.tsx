import React from 'react';

import {
    ActivityIndicator,
    View,
} from '~/bundles/common/components/components';
import { Color, LoaderSize } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';

type LoaderProperties = {
    size?: ValueOf<typeof LoaderSize>;
};
const Loader: React.FC<LoaderProperties> = ({ size = LoaderSize.LARGE }) => {
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
