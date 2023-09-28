import React from 'react';

import {
    CommunityIcon,
    Pressable,
    Text,
    TextInput,
    View,
} from '~/bundles/common/components/components';
import {
    Color,
    IconName,
    RootScreenName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useNavigation } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type NavigationProp,
    type RootNavigationParameterList,
} from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties = {
    searchQuery: string;
    onSearch: (text: string) => void;
};

const SearchTalents: React.FC<Properties> = ({ searchQuery, onSearch }) => {
    const navigation =
        useNavigation<NavigationProp<RootNavigationParameterList>>();

    const handlePressFilters = (): void => {
        navigation.navigate(RootScreenName.CANDIDATE_FILTER);
    };

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
                    <CommunityIcon
                        name={IconName.MAGNIFY}
                        size={25}
                        color={Color.PRIMARY}
                    />
                </View>

                <TextInput
                    onChangeText={(text): void => {
                        onSearch(text);
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
                onPress={handlePressFilters}
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
