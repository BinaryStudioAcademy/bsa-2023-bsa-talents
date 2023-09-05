import React, { useState } from 'react';
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
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Select = {
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: Select[];
    onSelect?: (item: Select) => void;
    multiSelect?: boolean;
};

const iconDefaultSize = 24;

const Selector = <T extends FieldValues>({
    name,
    control,
    options,
    multiSelect = false,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handlePressItem = (option: Select): void => {
        toggleIsListVisible();
        if (multiSelect) {
            if (value.includes(option.value)) {
                onChange(value.filter((item: string) => item !== option.value));
            } else {
                onChange([...value, option.value]);
            }
        } else {
            onChange(option.value);
        }
    };

    const selectIconName = isListVisible
        ? IconName.ARROW_DROP_UP
        : IconName.ARROW_DROP_DOWN;

    const selectedOptions = options
        .filter((option) => value.includes(option.value))
        .map((option) => option.label);

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
                onPress={toggleIsListVisible}
            >
                <Text category={TextCategory.LABEL}>
                    {selectedOptions.join(', ')}
                </Text>
                <Icon
                    name={selectIconName}
                    size={iconDefaultSize}
                    color={Color.PRIMARY}
                />
            </Pressable>
            {isListVisible && (
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
                                key={item.value}
                                onPress={(): void => {
                                    handlePressItem(item);
                                }}
                            >
                                <Text
                                    category={TextCategory.LABEL}
                                    style={globalStyles.pv5}
                                >
                                    {item.label}
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
