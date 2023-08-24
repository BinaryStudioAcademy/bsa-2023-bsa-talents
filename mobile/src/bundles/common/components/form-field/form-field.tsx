import React from 'react';
import {
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    errors: FieldErrors<T>;
    name: FieldPath<T>;
    children: React.ReactNode;
    label?: string;
    required?: boolean;
    hasError?: boolean;
};

const FormField: React.FC<Properties<FieldValues>> = ({
    errors,
    name,
    children,
    label,
    required,
}) => {
    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <View>
            {label && (
                <Text category={TextCategory.LABEL} style={globalStyles.mv5}>
                    {label}
                    {required && (
                        <Text
                            category={TextCategory.H6}
                            style={styles.requiredFlag}
                        >
                            *
                        </Text>
                    )}
                </Text>
            )}

            {React.Children.map(children, (child) =>
                React.cloneElement(
                    child as React.ReactElement<Properties<FieldValues>>,
                    {
                        hasError,
                    },
                ),
            )}

            {hasError && (
                <Text style={styles.errorText}>{error as string}</Text>
            )}
        </View>
    );
};

export { FormField };
