import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type TextInputProps } from 'react-native';
import { TextInput } from 'react-native';

import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = TextInputProps & {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
};

const Input = <T extends FieldValues>({
    editable,
    hasError,
    control,
    name,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange, onBlur } = field;

    return (
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
    );
};

export { Input };
