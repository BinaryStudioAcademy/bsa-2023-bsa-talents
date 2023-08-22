import React from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type TextInputProps } from 'react-native';
import { TextInput } from 'react-native';

import { Text, View } from '~/bundles/common/components/components';
import { useFormController } from '~/bundles/common/hooks/hooks';

import { styles } from './styles';

type InputType = 'text' | 'number' | 'email' | 'password';

type Properties<T extends FieldValues> = TextInputProps & {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
    placeholder: string;
    type: InputType;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder,
    type,
    ...properties
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const { value, onChange, onBlur } = field;

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <View>
            <Text
                style={
                    properties.editable === false
                        ? styles.disabledLabel
                        : styles.label
                }
            >
                {label}
            </Text>
            <TextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder={placeholder}
                keyboardType={type === 'number' ? 'numeric' : 'default'}
                {...properties}
                style={[
                    properties.editable === false
                        ? styles.disabled
                        : styles.input,
                    hasError ? styles.error : styles.input,
                ]}
            />
            <Text style={styles.errorText}>
                {hasError && (error as string)}
            </Text>
        </View>
    );
};

export { Input };
