import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { CheckboxInGroup, View } from '~/bundles/common/components/components';
import { splitArrayInHalf } from '~/bundles/common/helpers/helpers';
import { useCallback, useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type CheckboxGroup = {
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    options: CheckboxGroup[];
};

const EmploymentTypes = <T extends FieldValues>({
    name,
    control,
    options,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;

    const [column1Options, column2Options] = splitArrayInHalf(options);

    const handleCheckboxOnChange = useCallback(
        (selectedType: string) => {
            const isChecked = value.includes(selectedType);
            const updatedEmploymentTypes = isChecked
                ? value.filter((type: string) => type !== selectedType)
                : [...value, selectedType];

            onChange(updatedEmploymentTypes);
        },
        [value, onChange],
    );

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentSpaceBetween,
                styles.employmentTypeContainer,
            ]}
        >
            <View style={globalStyles.flex1}>
                {column1Options.map((option) => (
                    <CheckboxInGroup
                        key={option.label}
                        label={option.label}
                        isChecked={value.includes(option.value)}
                        onChange={(): void => {
                            handleCheckboxOnChange(option.value);
                        }}
                    />
                ))}
            </View>
            <View style={globalStyles.flex1}>
                {column2Options.map((option) => (
                    <CheckboxInGroup
                        key={option.label}
                        label={option.label}
                        isChecked={value.includes(option.value)}
                        onChange={(): void => {
                            handleCheckboxOnChange(option.value);
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export { EmploymentTypes };
