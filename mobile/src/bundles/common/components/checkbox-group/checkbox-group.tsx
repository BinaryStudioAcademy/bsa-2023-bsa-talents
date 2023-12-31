import React from 'react';

import { Checkbox, View } from '~/bundles/common/components/components';
import { splitArrayInHalf } from '~/bundles/common/helpers/helpers';
import { useCallback, useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from '~/bundles/common/types/types';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    options: string[];
};

const CheckboxGroup = <T extends FieldValues>({
    name,
    control,
    options,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;

    const [column1Options, column2Options] = splitArrayInHalf(options);

    const handleToggleCheckbox = useCallback(
        (selectedType: string) => {
            const isCheckedBefore = value.includes(selectedType);
            const updatedCheckboxGroup = isCheckedBefore
                ? value.filter((type: string) => type !== selectedType)
                : [...value, selectedType];

            onChange(updatedCheckboxGroup);
        },
        [value, onChange],
    );

    const renderCheckboxOption = (options: string[]): JSX.Element[] => {
        return options.map((option) => (
            <Checkbox
                key={option}
                label={option}
                isChecked={value.includes(option)}
                onChange={(): void => {
                    handleToggleCheckbox(option);
                }}
            />
        ));
    };

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentSpaceBetween,
                styles.checkboxGroupContainer,
            ]}
        >
            <View style={globalStyles.flex1}>
                {renderCheckboxOption(column1Options)}
            </View>
            <View style={globalStyles.flex1}>
                {renderCheckboxOption(column2Options)}
            </View>
        </View>
    );
};

export { CheckboxGroup };
