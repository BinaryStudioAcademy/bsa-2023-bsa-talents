import React from 'react';

import {
    ActivityIndicator,
    View,
} from '~/bundles/common/components/components';
import { Color, LoaderSize } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type StyleProp,
    type ValueOf,
    type ViewStyle,
} from '~/bundles/common/types/types';

type LoaderProperties = {
    containerStyle?: StyleProp<ViewStyle>;
    size?: ValueOf<typeof LoaderSize>;
};
const Loader: React.FC<LoaderProperties> = ({
    size = LoaderSize.LARGE,
    containerStyle,
}) => {
    return (
        <View
            style={[
                globalStyles.flex1,
                globalStyles.alignItemsCenter,
                globalStyles.justifyContentCenter,
                containerStyle,
            ]}
        >
            <ActivityIndicator color={Color.PRIMARY} size={size} />
        </View>
    );
};

export { Loader };
