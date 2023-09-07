import CheckBox, { type CheckBoxProps } from '@react-native-community/checkbox';
import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties<T extends FieldValues> = CheckBoxProps & {
    label?: string;
    name: FieldPath<T>;
    control: Control<T, null>;
    containerStyle?: StyleProp<ViewStyle>;
};

const FormCheckbox = <T extends FieldValues>({
    label,
    name,
    control,
    containerStyle,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    return (
        <View
            style={[
                containerStyle,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsFlexStart,
            ]}
        >
            <CheckBox
                value={value}
                onValueChange={onChange}
                tintColors={{ true: Color.PRIMARY, false: Color.INPUT }}
                {...props}
            />
            {label && (
                <Text category={TextCategory.LABEL} style={globalStyles.mt5}>
                    {label}
                </Text>
            )}
        </View>
    );
};

export { FormCheckbox };
