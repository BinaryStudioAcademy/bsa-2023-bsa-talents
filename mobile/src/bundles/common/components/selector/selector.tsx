import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
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

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: string[];
    placeholder?: string;
    multiSelect?: boolean;
    onSelect?: (item: string) => void;
};

const iconDefaultSize = 24;

const Selector = <T extends FieldValues>({
    name,
    control,
    options,
    multiSelect = false,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const { isVisible, toggleVisibility } = useVisibility(false);

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

    const selectIconName = isVisible
        ? IconName.ARROW_DROP_UP
        : IconName.ARROW_DROP_DOWN;

    const selectedOptions = useMemo(
        () =>
            options
                .filter((option) => value.includes(option))
                .map((option) => option),
        [options, value],
    );
    const NO_SELECTED = 0;

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
                ]}
                onPress={toggleVisibility}
            >
                <Text category={TextCategory.LABEL}>
                    {selectedOptions.length > NO_SELECTED
                        ? selectedOptions.join(', ')
                        : placeholder}
                </Text>
                <Icon
                    name={selectIconName}
                    size={iconDefaultSize}
                    color={Color.PRIMARY}
                />
            </Pressable>
            {isVisible && (
                <View
                    style={[
                        globalStyles.pl20,
                        globalStyles.pb5,
                        globalStyles.width100,
                        styles.dropdown,
                        styles.dropdownButton,
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
                </View>
            )}
        </View>
    );
};

export { Selector };
