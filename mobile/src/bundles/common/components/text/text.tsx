import React from 'react';
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { type TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties = TextProps & {
    category?: keyof typeof TextCategory;
    style?: TextStyle;
    children: React.ReactNode;
};

const Text: React.FC<Properties> = ({ category, style, children }) => {
    const textStyles = [category && globalStyles[category], style];

    return <RNText style={textStyles}>{children}</RNText>;
};

export { Text };
