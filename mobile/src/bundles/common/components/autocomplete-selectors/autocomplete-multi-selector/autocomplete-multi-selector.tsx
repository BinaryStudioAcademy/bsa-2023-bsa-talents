import React from 'react';

import {
    ScrollView,
    Tag,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import {
    useFormController,
    useMemo,
    useSelectorAnimations,
    useState,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { Animated, globalStyles } from '~/bundles/common/styles/styles';
import {
    type AutocompleteMultiSelectorValue,
    type Control,
    type FieldPath,
    type FieldValues,
} from '~/bundles/common/types/types';

import { styles } from '../styles';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    placeholder?: string;
    control?: Control<T, null>;
    hasError?: boolean;
    items?: AutocompleteMultiSelectorValue[];
};

const AutocompleteMultiSelector = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onBlur, onChange } = field;
    const [search, setSearch] = useState('');
    const { isVisible, handleToggleVisibility } = useVisibility(false);
    const { heightAnimatedStyle } = useSelectorAnimations(isVisible);
    const handleSearch = (text: string): void => {
        setSearch(text);
    };

    const handleItemSelect = (item: AutocompleteMultiSelectorValue): void => {
        if (value.includes(item.value)) {
            return;
        }
        handleToggleVisibility();
        value.push(item);
        onChange(value);
    };

    const handleItemDelete = (itemName: string | number): void => {
        onChange(
            value.filter(
                ({ label }: AutocompleteMultiSelectorValue) =>
                    label !== itemName,
            ),
        );
    };

    const filteredItems = useMemo(() => {
        return items?.filter(
            ({ label }) =>
                label.toLowerCase().includes(search.toLowerCase()) &&
                !value.some(
                    (v: AutocompleteMultiSelectorValue) =>
                        v.label.toLowerCase() === label.toLowerCase(),
                ),
        );
    }, [value, search, items]);

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onFocus={handleToggleVisibility}
                    value={search}
                    onChangeText={handleSearch}
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
                    placeholderTextColor={Color.TEXT2}
                />

                <Animated.View
                    style={[
                        globalStyles.pl20,
                        globalStyles.width100,
                        heightAnimatedStyle,
                        styles.dropdown,
                    ]}
                >
                    <ScrollView nestedScrollEnabled persistentScrollbar>
                        {filteredItems?.map(
                            ({
                                label,
                                value,
                            }: AutocompleteMultiSelectorValue) => (
                                <TouchableOpacity
                                    key={value}
                                    onPress={(): void => {
                                        handleItemSelect({ value, label });
                                    }}
                                >
                                    <Text
                                        category={TextCategory.LABEL}
                                        style={globalStyles.pv5}
                                    >
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            ),
                        )}
                    </ScrollView>
                </Animated.View>
            </View>
            <View
                style={[
                    globalStyles.mt15,
                    globalStyles.flexDirectionRow,
                    styles.tagContainer,
                ]}
            >
                {value?.map(
                    ({ label, value }: AutocompleteMultiSelectorValue) => (
                        <Tag
                            key={value}
                            value={label}
                            onPress={handleItemDelete}
                            iconName={IconName.CLOSE}
                            iconSize={15}
                        />
                    ),
                )}
            </View>
        </>
    );
};

export { AutocompleteMultiSelector };
