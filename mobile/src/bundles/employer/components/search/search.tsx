import React from 'react';

import { TextInput } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    searchQuery: string;
    setSearchQuery: (text: string) => void;
};

const Search: React.FC<Properties> = ({ searchQuery, setSearchQuery }) => {
    return (
        <TextInput
            onChangeText={(text): void => {
                setSearchQuery(text);
            }}
            value={searchQuery}
            placeholder="Search messages"
            placeholderTextColor={Color.TEXT2}
            style={[globalStyles.pl15, styles.input]}
        />
    );
};

export { Search };
