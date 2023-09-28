import React from 'react';

import {
    CommunityIcon,
    Pressable,
    Text,
} from '~/bundles/common/components/components';
import { IconSize, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    value: string | number;
    iconName?: string;
    iconSize?: number;
    onPress?: (value: string | number) => void;
};

const Tag: React.FC<Properties> = ({
    value,
    iconName,
    iconSize = IconSize.EXTRA_SMALL,
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
            {iconName && (
                <CommunityIcon name={iconName} size={iconSize} color="#000" />
            )}
        </Pressable>
    );
};

export { Tag };
