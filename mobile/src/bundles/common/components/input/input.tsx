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
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = TextInputProps & {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    editable,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const { value, onChange, onBlur } = field;

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <View>
            <Text
                style={[
                    globalStyles.mv5,
                    styles.label,
                    !editable && styles.disabledLabel,
                ]}
            >
                {label}
            </Text>
            <TextInput
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                {...props}
                style={[
                    globalStyles.pl10,
                    globalStyles.borderRadius5,
                    styles.input,
                    !editable && styles.disabled,

                    hasError && styles.error,
                ]}
            />
            <Text style={styles.errorText}>
                {hasError && (error as string)}
            </Text>
        </View>
    );
};

export { Input };
