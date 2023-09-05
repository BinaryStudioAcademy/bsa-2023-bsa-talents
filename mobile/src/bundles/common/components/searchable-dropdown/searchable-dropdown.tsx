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

type Item = {
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    items: Item[];
    onItemSelect: (item: Item) => void;
};

const SearchableDropdown = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    onItemSelect,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange, onBlur } = field;
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [isListVisible, setIsListVisible] = useState<boolean>(false);

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handleItemSelect = (item: Item): void => {
        setSelectedItems([...selectedItems, item]);
        onItemSelect(item);
        toggleIsListVisible();
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Start typing and select skills"
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
                        {items
                            .filter((item: Item) =>
                                item.label.toLowerCase().includes(value),
                            )
                            .map((item: Item) => (
                                <TouchableOpacity
                                    key={item.label}
                                    onPress={(): void => {
                                        handleItemSelect(item);
                                    }}
                                >
                                    <Text
                                        category={TextCategory.LABEL}
                                        style={globalStyles.pv5}
                                    >
                                        {item.label}
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
