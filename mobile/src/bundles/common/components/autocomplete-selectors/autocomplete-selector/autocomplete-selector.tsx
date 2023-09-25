import React from 'react';

import {
    MaterialIcon,
    ScrollView,
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
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { Animated, globalStyles } from '~/bundles/common/styles/styles';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from '~/bundles/common/types/types';

import { styles } from '../styles';
import { ICON_SIZE } from './constants/constants';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    items: string[];
    hasError?: boolean;
    control?: Control<T, null>;
    placeholder?: string;
    isIconShown?: boolean;
};

const AutocompleteSelector = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
    isIconShown = true,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onBlur, onChange } = field;
    const { isVisible, toggleVisibility } = useVisibility(false);

    const handleSearch = (text: string): void => {
        onChange(text);
    };

    const handleItemSelect = (item: string): void => {
        onChange(item);
        toggleVisibility();
    };

    const filteredItems = useMemo(() => {
        if (!value) {
            return items;
        }

        return items.filter(
            (item) => value && item.toLowerCase().includes(value.toLowerCase()),
        );
    }, [value, items]);

    const isContentVisible = isVisible && filteredItems.length > 0;
    const { heightAnimatedStyle, iconAnimatedStyle } =
        useSelectorAnimations(isContentVisible);

    return (
        <>
            <View style={styles.container}>
                <View style={globalStyles.justifyContentCenter}>
                    <TextInput
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onFocus={toggleVisibility}
                        value={value}
                        maxLength={100}
                        onChangeText={handleSearch}
                        style={[
                            globalStyles.pv10,
                            globalStyles.pl10,
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
                    <TouchableOpacity onPress={toggleVisibility}>
                        <Animated.View
                            style={[iconAnimatedStyle, styles.dropdownButton]}
                        >
                            {isIconShown && (
                                <MaterialIcon
                                    name={IconName.ARROW_DROP_DOWN}
                                    size={ICON_SIZE}
                                    color={Color.PRIMARY}
                                />
                            )}
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <Animated.View
                    style={[
                        globalStyles.pl20,
                        globalStyles.width100,
                        heightAnimatedStyle,
                        styles.dropdown,
                    ]}
                >
                    <ScrollView nestedScrollEnabled persistentScrollbar>
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
                </Animated.View>
            </View>
        </>
    );
};

export { AutocompleteSelector };
