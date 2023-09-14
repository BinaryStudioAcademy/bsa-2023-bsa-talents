import React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    children: React.ReactNode;
    errorMessage?: string;
    label?: string;
    required?: boolean;
    hasError?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
};

const FormField = <T extends FieldValues>({
    errorMessage,
    children,
    label,
    required,
    containerStyle,
}: Properties<T>): JSX.Element => {
    const hasError = Boolean(errorMessage);

    return (
        <View style={containerStyle}>
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

            {React.Children.map(children, (child) => {
                if (!child) {
                    return;
                }
                return React.cloneElement(
                    child as React.ReactElement<Properties<T>>,
                    {
                        hasError,
                    },
                );
            })}

            {hasError && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

export { FormField };
