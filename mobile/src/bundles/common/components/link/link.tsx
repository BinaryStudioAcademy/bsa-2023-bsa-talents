import React from 'react';

import { Text, TouchableOpacity } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useLinkTo } from '~/bundles/common/hooks/hooks';
import { type TextProps, type TextStyle } from '~/bundles/common/types/types';

type Properties = TextProps & {
    label: string;
    textComponentCategory?: (typeof TextCategory)[keyof typeof TextCategory];
    link: string;
    style?: TextStyle;
};

const Link: React.FC<Properties> = ({
    label,
    link,
    style,
    textComponentCategory = TextCategory.BODY1,
}) => {
    const linkTo = useLinkTo();

    return (
        <TouchableOpacity
            onPress={(): void => {
                linkTo(`/${link}`);
            }}
        >
            <Text category={textComponentCategory} style={style}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export { Link };
