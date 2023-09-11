import React from 'react';

import {
    FormField,
    Input,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const SearchTalents: React.FC = () => {
    const { control } = useAppForm({
        defaultValues: {
            searchTalents: '',
        },
    });
    return (
        <View
            style={[
                globalStyles.p25,
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentSpaceAround,
                globalStyles.alignItemsCenter,
            ]}
        >
            <FormField name="searchTalents" containerStyle={{ width: '70%' }}>
                <Input
                    name="searchTalents"
                    control={control}
                    placeholder="Search candidates"
                    iconName="magnify"
                />
            </FormField>
            <Pressable
                style={[
                    styles.filtersBtn,
                    globalStyles.borderRadius10,
                    globalStyles.pv5,
                    globalStyles.ph15,
                ]}
            >
                <Text category={TextCategory.MENU} style={styles.filtersText}>
                    Filters
                </Text>
            </Pressable>
        </View>
    );
};

export { SearchTalents };
