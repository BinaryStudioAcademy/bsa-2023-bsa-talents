import React from 'react';

import {
    MaterialIcon,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import {
    Color,
    IconName,
    IconSize,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useCallback,
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

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: string[];
    isIconShown?: boolean;
    hasError?: boolean;
    placeholder?: string;
    isMultiSelect?: boolean;
    onSelect?: (item: string) => void;
};

const Selector = <T extends FieldValues>({
    name,
    control,
    hasError,
    options,
    isMultiSelect = false,
    placeholder,
    isIconShown = true,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const { isVisible, handleToggleVisibility } = useVisibility(false);
    const { heightAnimatedStyle, iconAnimatedStyle } =
        useSelectorAnimations(isVisible);
    const NO_SELECTED = 0;

    const handlePressItem = useCallback(
        (option: string): void => {
            handleToggleVisibility();
            if (isMultiSelect) {
                if (value.includes(option)) {
                    onChange(value.filter((item: string) => item !== option));
                } else {
                    onChange([...value, option]);
                }
            } else {
                onChange(option);
            }
        },
        [handleToggleVisibility, isMultiSelect, value, onChange],
    );
    const selectedOptions = useMemo(
        () =>
            options
                .filter((option) => value?.includes(option))
                .map((option) => option),
        [options, value],
    );

    const placeHolderStyle =
        (selectedOptions.length > NO_SELECTED && value) || styles.placeholder;

    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    globalStyles.pv10,
                    globalStyles.pl10,
                    globalStyles.pr5,
                    globalStyles.borderRadius5,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.dropdownButton,
                    hasError && styles.error,
                ]}
                onPress={handleToggleVisibility}
            >
                <Text category={TextCategory.INPUT} style={placeHolderStyle}>
                    {selectedOptions.length > NO_SELECTED
                        ? selectedOptions.join(', ')
                        : placeholder}
                </Text>
                <Animated.View style={iconAnimatedStyle}>
                    {isIconShown && (
                        <MaterialIcon
                            name={IconName.ARROW_DROP_DOWN}
                            size={IconSize.GENERAL}
                            color={Color.PRIMARY}
                        />
                    )}
                </Animated.View>
            </Pressable>
            <Animated.View
                style={[
                    globalStyles.pl20,
                    globalStyles.width100,
                    styles.dropdown,
                    styles.dropdownButton,
                    heightAnimatedStyle,
                ]}
            >
                <ScrollView nestedScrollEnabled persistentScrollbar>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={(): void => {
                                handlePressItem(item);
                            }}
                        >
                            <Text
                                category={TextCategory.INPUT}
                                style={globalStyles.pv5}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

export { Selector };
