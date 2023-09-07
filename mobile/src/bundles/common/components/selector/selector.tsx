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

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: string[];
    placeholder?: string;
    onSelect?: (item: string) => void;
};

const iconDefaultSize = 24;

const Selector = <T extends FieldValues>({
    name,
    control,
    options,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleIsListVisible = (): void => {
        setIsListVisible((previous) => !previous);
    };

    const handlePressItem = (option: string): void => {
        toggleIsListVisible();
        onChange(option);
    };

    const selectedOption = options.find((option) => option === value);

    const selectIconName = isListVisible
        ? IconName.ARROW_DROP_UP
        : IconName.ARROW_DROP_DOWN;

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
                <Text
                    category={
                        value
                            ? TextCategory.LABEL
                            : TextCategory.INPUT_PLACEHOLDER
                    }
                >
                    {selectedOption ?? placeholder}
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
