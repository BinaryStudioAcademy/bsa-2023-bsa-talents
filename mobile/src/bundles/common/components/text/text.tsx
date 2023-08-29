import React from 'react';
import {
    type StyleProp,
    Text as RNText,
    type TextProps,
    type TextStyle,
} from 'react-native';

import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';

type Properties = TextProps & {
    children: React.ReactNode;
    category?: ValueOf<typeof TextCategory>;
    style?: StyleProp<TextStyle>;
};

const Text: React.FC<Properties> = ({
    category = TextCategory.BODY1,
    children,
    style,
    ...props
}) => {
    const textStyles = [globalStyles[category], style];

    return (
        <RNText {...props} style={textStyles}>
            {children}
        </RNText>
    );
};

export { Text };
