import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    ScrollView,
    Text,
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
import { globalStyles } from '~/bundles/common/styles/styles';

import { ICON_SIZE } from '../constants/constants';
import { styles } from '../styles';

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
                            <Icon
                                name={IconName.ARROW_DROP_DOWN}
                                size={ICON_SIZE}
                                color={Color.PRIMARY}
                            />
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
