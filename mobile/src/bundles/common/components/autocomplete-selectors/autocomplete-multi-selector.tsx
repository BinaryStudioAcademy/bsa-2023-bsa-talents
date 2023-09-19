import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import {
    Loader,
    ScrollView,
    Tag,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import {
    Color,
    IconName,
    LoaderSize,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useFormController,
    useMemo,
    useSelectorAnimations,
    useState,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type AutocompleteMultiSelectorValue } from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    items: AutocompleteMultiSelectorValue[];
    placeholder?: string;
    control?: Control<T, null>;
    isValuesLoading?: boolean;
    hasError?: boolean;
};

const AutocompleteMultiSelector = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
    isValuesLoading,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onBlur, onChange } = field;
    const [search, setSearch] = useState('');
    const { isVisible, toggleVisibility } = useVisibility(false);
    const { heightAnimatedStyle } = useSelectorAnimations(isVisible);

    const handleSearch = (text: string): void => {
        setSearch(text);
    };

    const handleItemSelect = (item: AutocompleteMultiSelectorValue): void => {
        if (value.includes(item.value)) {
            return;
        }
        toggleVisibility();
        value.push(item);
        onChange(value);
    };

    const handleItemDelete = (itemName: string): void => {
        onChange(
            value.filter(
                (item: AutocompleteMultiSelectorValue) =>
                    item.label !== itemName,
            ),
        );
    };

    const filteredItems = useMemo(() => {
        return items.filter(
            (item) =>
                item.value.toLowerCase().includes(search.toLowerCase()) &&
                !value.some(
                    (v: AutocompleteMultiSelectorValue) =>
                        v.value === item.value,
                ),
        );
    }, [search, value, items]);

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onFocus={toggleVisibility}
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
                        {isValuesLoading ? (
                            <Loader size={LoaderSize.SMALL} />
                        ) : (
                            filteredItems.map(
                                (item: AutocompleteMultiSelectorValue) => (
                                    <TouchableOpacity
                                        key={item.value}
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
                                ),
                            )
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
                {value.map((item: AutocompleteMultiSelectorValue) => (
                    <Tag
                        key={item.value}
                        value={item.label}
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
