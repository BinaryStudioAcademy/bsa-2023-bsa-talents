import React from 'react';
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties = TextProps & {
    children: React.ReactNode;
    category?: keyof typeof TextCategory;
    style?: TextStyle;
};

const Text: React.FC<Properties> = ({
    category = TextCategory.BODY1,
    children,
    ...props
}) => {
    return (
        <RNText {...props} style={globalStyles[category]}>
            {children}
        </RNText>
    );
};

export { Text };
