import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import ToggleSwitch from 'toggle-switch-react-native';

import { Color, TextCategory } from '../../enums/enums';
import { useFormController } from '../../hooks/hooks';
import { globalStyles } from '../../styles/styles';
import { Text, View } from '../components';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    label?: string;
};

const Switch = <T extends FieldValues>({
    name,
    control,
    label,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
            ]}
        >
            <ToggleSwitch
                isOn={value}
                onToggle={onChange}
                onColor={Color.PRIMARY}
            />
            {label && (
                <Text style={globalStyles.ml10} category={TextCategory.LABEL}>
                    {label}
                </Text>
            )}
        </View>
    );
};

export { Switch };
