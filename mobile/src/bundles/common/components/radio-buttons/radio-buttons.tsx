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
import { TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties<T extends FieldValues> = RadioButtonProps & {
    radioButtons: RadioButtonProps[];
    label?: string;
    name: FieldPath<T>;
    control: Control<T, null>;
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
    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsFlexStart,
            ]}
        >
            <RadioGroup
                radioButtons={radioButtons}
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
