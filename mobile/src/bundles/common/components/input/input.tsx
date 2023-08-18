import React from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { TextInput } from 'react-native';

import { Text, View } from '~/bundles/common/components/components';
import { useFormController } from '~/bundles/common/hooks/hooks';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
    placeholder: string;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <View>
            <Text>{label}</Text>
            <TextInput
                {...field}
                placeholder={placeholder}
                style={styles.input}
            />
            <Text>{hasError && (error as string)}</Text>
        </View>
    );
};

export { Input };
