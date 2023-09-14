import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import ToggleSwitch from 'toggle-switch-react-native';

import { Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

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
