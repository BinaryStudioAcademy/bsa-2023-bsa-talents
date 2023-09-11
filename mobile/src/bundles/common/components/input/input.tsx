import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type TextInputProps } from 'react-native';
import { TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = TextInputProps & {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    marker?: string;
    iconName?: string;
    iconSize?: number;
};

const defaultIconSize = 25;

const Input = <T extends FieldValues>({
    editable = true,
    hasError,
    control,
    name,
    marker,
    multiline = false,
    iconName,
    iconSize = defaultIconSize,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange, onBlur } = field;

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentCenter,
                globalStyles.alignItemsStretch,
            ]}
        >
            {marker && (
                <View
                    style={[
                        globalStyles.justifyContentCenter,
                        globalStyles.ph20,
                        styles.marker,
                    ]}
                >
                    <Text category={TextCategory.INPUT}>{marker}</Text>
                </View>
            )}

            {iconName && (
                <Icon
                    name={iconName}
                    size={iconSize}
                    color={Color.PRIMARY}
                    style={styles.icon}
                />
            )}

            <TextInput
                onChangeText={onChange}
                value={value.toString()}
                onBlur={onBlur}
                {...props}
                style={[
                    globalStyles.flex1,
                    globalStyles.pl25,
                    globalStyles.Input,
                    !marker && globalStyles.borderRadius5,
                    !iconName && globalStyles.pl10,
                    styles.input,
                    multiline && styles.multiline,
                    !editable && styles.disabled,
                    hasError && styles.error,
                ]}
            />
        </View>
    );
};

export { Input };
