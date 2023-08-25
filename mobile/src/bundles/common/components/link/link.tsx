import React from 'react';
import { type TextProps, type TextStyle } from 'react-native';

import { TextCategory } from '../../enums/enums';
import { useLinkTo } from '../../hooks/hooks';
import { Text, TouchableOpacity } from '../components';

type Properties = TextProps & {
    label: string;
    textComponentCategory?: (typeof TextCategory)[keyof typeof TextCategory];
    to: string;
    style?: TextStyle;
};

const Link: React.FC<Properties> = ({
    label,
    to,
    style,
    textComponentCategory = TextCategory.BODY1,
}) => {
    const linkTo = useLinkTo();

    return (
        <TouchableOpacity
            onPress={(): void => {
                linkTo(`/${to}`);
            }}
        >
            <Text category={textComponentCategory} style={style}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export { Link };
