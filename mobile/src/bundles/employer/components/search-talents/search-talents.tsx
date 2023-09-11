import React from 'react';

import {
    FormField,
    Input,
    Pressable,
    Text,
    View,
} from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
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
                styles.container,
                globalStyles.mt15,
                globalStyles.mh15,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
            ]}
        >
            <FormField name="searchTalents" containerStyle={styles.search}>
                <Input
                    name="searchTalents"
                    control={control}
                    placeholder="Search candidates"
                    iconName={IconName.MAGNIFY}
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
                <Text category={TextCategory.BUTTON} style={styles.filtersText}>
                    Filters
                </Text>
            </Pressable>
        </View>
    );
};

export { SearchTalents };
