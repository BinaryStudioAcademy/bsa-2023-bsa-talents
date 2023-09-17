import React from 'react';

import {
    Icon,
    Pressable,
    Text,
    TextInput,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    searchQuery: string;
    setSearchQuery: (text: string) => void;
};

const SearchTalents: React.FC<Properties> = ({
    searchQuery,
    setSearchQuery,
}) => {
    return (
        <View
            style={[
                styles.container,
                globalStyles.mt15,
                globalStyles.mh15,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
            ]}
        >
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentCenter,
                    globalStyles.alignItemsStretch,
                    styles.search,
                ]}
            >
                <View
                    style={[
                        globalStyles.alignSelfCenter,
                        globalStyles.pl5,
                        styles.iconContainer,
                    ]}
                >
                    <Icon
                        name={IconName.MAGNIFY}
                        size={25}
                        color={Color.PRIMARY}
                    />
                </View>

                <TextInput
                    onChangeText={(text): void => {
                        setSearchQuery(text);
                    }}
                    value={searchQuery}
                    placeholder="Search candidates"
                    placeholderTextColor={Color.TEXT2}
                    style={[
                        globalStyles.flex1,
                        globalStyles.Input,
                        styles.input,
                    ]}
                />
            </View>
            <Pressable
                style={[
                    styles.filtersBtn,
                    globalStyles.borderRadius10,
                    globalStyles.pv5,
                    globalStyles.ph15,
                ]}
            >
                <Text category={TextCategory.BUTTON} style={styles.filtersText}>
                    Filters
                </Text>
            </Pressable>
        </View>
    );
};

export { SearchTalents };
