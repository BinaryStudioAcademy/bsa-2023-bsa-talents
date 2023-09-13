import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import {
    useCallback,
    useFormController,
    useMemo,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { SELECTOR_STYLE } from './constants/constants';
import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    options: string[];
    placeholder?: string;
    multiSelect?: boolean;
    onSelect?: (item: string) => void;
};

const { INITIAL_DROPDOWN_HEIGHT, MAX_DROPDOWN_HEIGHT, ICON_SIZE } =
    SELECTOR_STYLE;

const Selector = <T extends FieldValues>({
    name,
    control,
    hasError,
    options,
    multiSelect = false,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const { isVisible, toggleVisibility } = useVisibility(false);
    const placeHolderStyle = value || styles.placeholder;

    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: withTiming(isVisible ? '180deg' : '0deg') }],
        };
    });

    const heightAnimatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(
                isVisible ? MAX_DROPDOWN_HEIGHT : INITIAL_DROPDOWN_HEIGHT,
                { duration: 400 },
            ),
        };
    });

    const handlePressItem = useCallback(
        (option: string): void => {
            toggleVisibility();
            if (multiSelect) {
                if (value.includes(option)) {
                    onChange(value.filter((item: string) => item !== option));
                } else {
                    onChange([...value, option]);
                }
            } else {
                onChange(option);
            }
        },
        [toggleVisibility, multiSelect, value, onChange],
    );
    const selectedOptions = useMemo(
        () =>
            options
                .filter((option) => value?.includes(option))
                .map((option) => option),
        [options, value],
    );
    const NO_SELECTED = 0;
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
                onPress={toggleVisibility}
            >
                <Text category={TextCategory.LABEL} style={placeHolderStyle}>
                    {selectedOptions.length > NO_SELECTED
                        ? selectedOptions.join(', ')
                        : placeholder}
                </Text>
                <Animated.View style={iconAnimatedStyle}>
                    <Icon
                        name={IconName.ARROW_DROP_DOWN}
                        size={ICON_SIZE}
                        color={Color.PRIMARY}
                    />
                </Animated.View>
            </Pressable>
            <Animated.View
                style={[
                    globalStyles.pl20,
                    globalStyles.width100,
                    isVisible && styles.dropdown,
                    styles.dropdownButton,
                    !isVisible && styles.dropdownClosed,
                    heightAnimatedStyle,
                ]}
            >
                <ScrollView nestedScrollEnabled>
                    {options.map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={(): void => {
                                handlePressItem(item);
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
    );
};

export { Selector };
