import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
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
    useState,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { SELECTOR_STYLE } from './constants/constants';
import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control?: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    items: string[];
    placeholder?: string;
};

const { ICON_SIZE, MARGIN_BOTTOM } = SELECTOR_STYLE;

const AutocompleteSelector = <T extends FieldValues>({
    control,
    name,
    hasError,
    items,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onBlur, onChange } = field;
    const [search, setSearch] = useState('');
    const { isVisible, toggleVisibility } = useVisibility(false);

    const handleSearch = (text: string): void => {
        setSearch(text);
        onChange(text);
    };

    const handleItemSelect = (item: string): void => {
        setSearch(item);
        onChange(item);
        toggleVisibility();
    };

    const filteredItems = useMemo(() => {
        if (!search) {
            return items;
        }

        return items.filter(
            (item) =>
                search && item.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search, items]);

    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            marginBottom: MARGIN_BOTTOM,
            transform: [{ rotate: withTiming(isVisible ? '180deg' : '0deg') }],
        };
    });

    return (
        <>
            <View style={styles.container}>
                <View>
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
