import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';

import {
    ScrollView,
    Tag,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useFormController, useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    items: string[];
    placeholder?: string;
};

const AutocompleteMultiSelector = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange, onBlur } = field;
    const [isListVisible, setIsListVisible] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handleItemSelect = (item: string): void => {
        if (selectedItems.includes(item)) {
            return;
        }
        setSelectedItems((previousItems) => {
            return [...previousItems, item];
        });
        toggleIsListVisible();
    };

    const handleItemDelete = (itemName: string): void => {
        setSelectedItems((previousItems) =>
            previousItems.filter((item) => item != itemName),
        );
    };

    const filteredItems = (items: string[]): string[] => {
        if (typeof value !== 'string') {
            return items;
        }
        return items.filter(
            (item) =>
                item.toLowerCase().includes(value.toLowerCase()) &&
                !selectedItems.includes(item),
        );
    };

    return (
        <>
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
                            {filteredItems(items).map((item: string) => (
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
            <View
                style={[
                    globalStyles.mt15,
                    globalStyles.flexDirectionRow,
                    styles.tagContainer,
                ]}
            >
                {selectedItems.map((item) => (
                    <Tag
                        key={item}
                        value={item}
                        onPress={handleItemDelete}
                        iconName={IconName.CLOSE}
                        iconSize={15}
                    />
                ))}
            </View>
        </>
    );
};

export { AutocompleteMultiSelector };
