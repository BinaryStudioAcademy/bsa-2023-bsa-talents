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
};

const CurrencyInput = <T extends FieldValues>({
    editable = true,
    hasError,
    control,
    name,
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
            <View
                style={[
                    globalStyles.justifyContentCenter,
                    globalStyles.ph20,
                    styles.currency,
                ]}
            >
                <Text category="Input">$</Text>
            </View>
            <TextInput
                onChangeText={onChange}
                value={value.toString()}
                onBlur={onBlur}
                keyboardType="numeric"
                {...props}
                style={[
                    globalStyles.flex1,
                    globalStyles.pl10,
                    globalStyles.Input,
                    styles.input,
                    !editable && styles.disabled,
                    hasError && styles.error,
                ]}
            />
        </View>
    );
};

export { CurrencyInput };
