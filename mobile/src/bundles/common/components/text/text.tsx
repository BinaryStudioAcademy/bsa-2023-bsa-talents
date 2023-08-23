import React from 'react';
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties = TextProps & {
    children: React.ReactNode;
    category?: (typeof TextCategory)[keyof typeof TextCategory];
    style?: TextStyle;
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
