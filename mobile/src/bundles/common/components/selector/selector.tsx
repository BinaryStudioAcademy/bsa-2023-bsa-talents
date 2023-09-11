import React, { useState } from 'react';
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
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { SELECTOR_STYLE } from './constants/constants';
import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    options: string[];
    placeholder?: string;
    onSelect?: (item: string) => void;
};

const { INITIAL_DROPDOWN_HEIGHT, MAX_DROPDOWN_HEIGHT, ICON_SIZE } =
    SELECTOR_STYLE;

const Selector = <T extends FieldValues>({
    name,
    control,
    hasError,
    options,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const [isListVisible, setIsListVisible] = useState(false);
    const placeHolderStyle = value ? {} : styles.placeholder;
    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: withTiming(isListVisible ? '180deg' : '0deg') },
            ],
        };
    });

    const heightAnimatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(
                isListVisible ? MAX_DROPDOWN_HEIGHT : INITIAL_DROPDOWN_HEIGHT,
                { duration: 400 },
            ),
        };
    });

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handlePressItem = (option: string): void => {
        toggleIsListVisible();
        onChange(option);
    };

    const selectedOption = options.find((option) => option === value);

    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    globalStyles.pv10,
                    globalStyles.pl15,
                    globalStyles.pr5,
                    globalStyles.borderRadius5,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.dropdownButton,
                    hasError && styles.error,
                ]}
                onPress={toggleIsListVisible}
            >
                <Text category={TextCategory.LABEL} style={placeHolderStyle}>
                    {selectedOption ?? placeholder}
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
                    isListVisible && globalStyles.pb5,
                    styles.dropdownButton,
                    !isListVisible && styles.dropdownClosed,
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
