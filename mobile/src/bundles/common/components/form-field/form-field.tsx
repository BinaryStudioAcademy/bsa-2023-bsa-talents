import React from 'react';
import {
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { Text, View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    required: boolean;
    children: React.ReactNode;
};

const FormField = <T extends FieldValues>({
    errors,
    label,
    name,
    required,
    children,
}: Properties<T>): JSX.Element => {
    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <View>
            {label && (
                <Text style={[globalStyles.mv5, styles.label]}>
                    {label}
                    {required && <Text style={styles.requiredFlag}>*</Text>}
                </Text>
            )}

            {children}

            <Text style={styles.errorText}>
                {hasError && (error as string)}
            </Text>
        </View>
    );
};

export { FormField };
