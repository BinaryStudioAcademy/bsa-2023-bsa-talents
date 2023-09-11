import { MenuItem, Select as MuiSelect } from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { FormControl, FormLabel } from '../components.js';
import styles from './styles.module.scss';

type SelectOption<T> = {
    value: T;
    label: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: SelectOption<string | number>[];
    placeholder?: string;
    label?: string;
    isMulti?: boolean;
    hasError?: boolean;
    isDisabled?: boolean;
};

const Select = <T extends FieldValues>({
    control,
    name,
    options,
    label,
    isMulti,
    hasError,
    isDisabled,
    placeholder = 'Placeholder',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const handleSelectChange = useCallback(
        (selected: string | number | (string | number)[]) => {
            if (
                !selected ||
                (Array.isArray(selected) && selected.length === 0)
            ) {
                return (
                    <span className={styles.placeholder}>{placeholder}</span>
                );
            }

            if (Array.isArray(selected)) {
                const selectedOptions = options.filter((option) =>
                    selected.includes(option.value),
                );
                return selectedOptions.map((option) => option.label).join(', ');
            }

            return options.find((option) => option.value === selected)?.label;
        },
        [options, placeholder],
    );

    return (
        <FormControl
            className={styles.container}
            hasError={hasError}
            isDisabled={isDisabled}
        >
            {label && <FormLabel>{label}</FormLabel>}
            <MuiSelect
                {...field}
                displayEmpty
                multiple={isMulti}
                className={styles.input}
                renderValue={handleSelectChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export { Select };
