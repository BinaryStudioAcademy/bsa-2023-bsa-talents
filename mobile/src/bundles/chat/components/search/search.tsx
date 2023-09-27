import React from 'react';

import { TextInput } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type StyleProp, type ViewStyle } from '~/bundles/common/types/types';

type Properties = {
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
};

const Search: React.FC<Properties> = ({
    searchQuery,
    setSearchQuery,
    containerStyle,
}) => {
    return (
        <TextInput
            onChangeText={(text): void => {
                setSearchQuery(text);
            }}
            value={searchQuery}
            placeholder="Search messages"
            placeholderTextColor={Color.TEXT2}
            style={[globalStyles.pl15, globalStyles.Input, containerStyle]}
        />
    );
};

export { Search };
