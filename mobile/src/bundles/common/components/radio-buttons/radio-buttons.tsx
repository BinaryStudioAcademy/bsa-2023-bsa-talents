import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import RadioGroup, {
    type RadioButtonProps,
} from 'react-native-radio-buttons-group';

import { Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties<T extends FieldValues> = RadioButtonProps & {
    radioButtons: RadioButtonProps[];
    label?: string;
    name: FieldPath<T>;
    control: Control<T, null>;
};

const radioButtonsStyles = {
    color: Color.PRIMARY,
    borderColor: Color.INPUT,
};

const RadioButtons = <T extends FieldValues>({
    radioButtons,
    label,
    name,
    control,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;

    const radioButtonsWithStyles = radioButtons.map((button) => {
        return {
            ...button,
            ...radioButtonsStyles,
        };
    });

    return (
        <View>
            <RadioGroup
                radioButtons={radioButtonsWithStyles}
                onPress={onChange}
                selectedId={value}
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

export { RadioButtons };
