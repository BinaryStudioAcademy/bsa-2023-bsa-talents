// This component was taken from
// bt-104: Create complete profile screen UI
// with some minor changes

import CheckBox, { type CheckBoxProps } from '@react-native-community/checkbox';
import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties<T extends FieldValues> = CheckBoxProps & {
    label?: string;
    name: FieldPath<T>;
    control: Control<T, null>;
};

const Checkbox = <T extends FieldValues>({
    label,
    name,
    control,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;

    const colorCheckbox = props.disabled ? Color.TEXT2 : Color.PRIMARY;

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsFlexStart,
            ]}
        >
            <CheckBox
                value={value}
                onValueChange={onChange}
                tintColors={{ true: colorCheckbox, false: Color.INPUT }}
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

export { Checkbox };
