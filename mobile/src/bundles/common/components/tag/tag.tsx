import React from 'react';

import { Icon, Pressable, Text } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    value: string;
    iconName?: string;
    iconSize?: number;
    onPress?: (value: string) => void;
};
const iconDefaultSize = 12;

const Tag: React.FC<Properties> = ({
    value,
    iconName,
    iconSize = iconDefaultSize,
    onPress,
}) => {
    return (
        <Pressable
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.borderRadius5,
                globalStyles.justifyContentSpaceAround,
                globalStyles.alignItemsCenter,
                globalStyles.p5,
                styles.tag,
            ]}
            onPress={(): void => {
                onPress?.(value);
            }}
        >
            <Text category={TextCategory.LABEL}>{value}</Text>
            {iconName && <Icon name={iconName} size={iconSize} color="#000" />}
        </Pressable>
    );
};

export { Tag };
