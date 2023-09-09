import React from 'react';
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
import {
    useCallback,
    useFormController,
    useMemo,
    useState,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control?: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    items: string[];
    placeholder?: string;
};

const AutocompleteSelector = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { onBlur, onChange } = field;
    const [search, setSearch] = useState('');
    const { isVisible, toggleVisibility } = useVisibility(false);

    const handleSearch = (text: string): void => {
        setSearch(text);
    };

    const handleItemSelect = (item: string): void => {
        setSearch(item);
        onChange(item);
        toggleVisibility();
    };

    const filterItems = useCallback(
        (items: string[]) =>
            items.filter((item) =>
                item.toLowerCase().includes(search.toLowerCase()),
            ),
        [search],
    );

    const filteredItems = useMemo(
        () => filterItems(items),
        [filterItems, items],
    );

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
                />
                {isVisible && (
                    <View
                        style={[
                            globalStyles.pl20,
                            globalStyles.pb5,
                            globalStyles.width100,
                            styles.dropdown,
                        ]}
                    >
                        <ScrollView nestedScrollEnabled>
                            {filteredItems.map((item: string) => (
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
        </>
    );
};

export { AutocompleteSelector };
