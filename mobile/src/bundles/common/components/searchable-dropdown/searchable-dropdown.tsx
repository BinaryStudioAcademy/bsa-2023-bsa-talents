import React, { useState } from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';

import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    items: string[];
    placeholder?: string;
    onItemSelect: (item: string) => void;
};

const SearchableDropdown = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
    onItemSelect,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange, onBlur } = field;
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isListVisible, setIsListVisible] = useState<boolean>(false);

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handleItemSelect = (item: string): void => {
        setSelectedItems([...selectedItems, item]);
        onItemSelect(item);
        toggleIsListVisible();
    };

    const filterItems = (items: string[]): string[] => {
        if (typeof value !== 'string') {
            return items;
        }
        return items.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase()),
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                onChangeText={onChange}
                onBlur={onBlur}
                onFocus={toggleIsListVisible}
                style={[
                    globalStyles.pv10,
                    globalStyles.pl15,
                    globalStyles.pr5,
                    globalStyles.borderRadius5,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.input,
                    hasError && styles.error,
                ]}
            />
            {isListVisible && (
                <View
                    style={[
                        globalStyles.pl20,
                        globalStyles.pb5,
                        globalStyles.width100,
                        styles.dropdown,
                    ]}
                >
                    <ScrollView nestedScrollEnabled>
                        {filterItems(items).map((item: string) => (
                            <TouchableOpacity
                                key={item}
                                onPress={(): void => {
                                    handleItemSelect(item);
                                }}
                            >
                                <Text
                                    category={TextCategory.LABEL}
                                    style={globalStyles.pv5}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export { SearchableDropdown };
