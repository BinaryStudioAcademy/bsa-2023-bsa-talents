import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import RadioGroup, {
    type RadioGroupProps,
} from 'react-native-radio-buttons-group';

import { View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';

import { styles } from './styles';

type Properties<T extends FieldValues> = RadioGroupProps & {
    name: FieldPath<T>;
    control: Control<T, null>;
};

const radioButtonsStyles = {
    color: Color.PRIMARY,
    borderColor: Color.INPUT,
    labelStyle: styles.label,
};

const RadioButtons = <T extends FieldValues>({
    radioButtons,
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
                containerStyle={styles.container}
                {...props}
            />
        </View>
    );
};

export { RadioButtons };
