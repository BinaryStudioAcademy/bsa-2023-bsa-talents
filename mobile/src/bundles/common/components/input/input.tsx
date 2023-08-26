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

import { Text, View } from '../components';
import { styles } from './styles';

type Properties<T extends FieldValues> = TextInputProps & {
    control: Control<T, null>;
    name: FieldPath<T>;
    hasError?: boolean;
    marker?: string;
    inputType?: 'text' | 'number';
};

const Input = <T extends FieldValues>({
    editable = true,
    hasError,
    control,
    name,
    marker,
    inputType = 'text',
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange, onBlur } = field;
    const keyboardType = inputType === 'number' ? 'numeric' : 'default';

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
                    <Text category="Input">{marker}</Text>
                </View>
            )}
            <TextInput
                onChangeText={onChange}
                value={value.toString()}
                onBlur={onBlur}
                keyboardType={keyboardType}
                {...props}
                style={[
                    globalStyles.flex1,
                    globalStyles.pl10,
                    globalStyles.Input,
                    !marker && globalStyles.borderRadius5,
                    styles.input,
                    !editable && styles.disabled,
                    hasError && styles.error,
                ]}
            />
        </View>
    );
};

export { Input };
