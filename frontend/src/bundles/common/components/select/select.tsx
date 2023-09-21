import { InputAdornment, MenuItem, Select as MuiSelect } from '@mui/material';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import { FormControl, FormLabel } from '../components.js';
import styles from './styles.module.scss';

type SelectOption<T> = {
    value: T;
    label: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    name: FieldPath<T>;
    options: SelectOption<string | number>[];
    placeholder?: string;
    label?: string;
    isMulti?: boolean;
    isDisabled?: boolean;
    startAdornmentText?: string;
};

const Select = <T extends FieldValues>({
    control,
    errors,
    name,
    options,
    label,
    isMulti,
    isDisabled,
    placeholder = 'Placeholder',
    startAdornmentText,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const error = errors[name]?.message;
    const hasError = Boolean(error);

    const selectStyles = getValidClassNames(
        styles.input,
        hasError && styles.hasError,
    );

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
        <FormControl className={styles.container} isDisabled={isDisabled}>
            {label && <FormLabel>{label}</FormLabel>}
            <MuiSelect
                {...field}
                displayEmpty
                multiple={isMulti}
                className={selectStyles}
                renderValue={handleSelectChange}
                value={field.value || ''}
                startAdornment={
                    startAdornmentText && (
                        <InputAdornment position="start">
                            {startAdornmentText}
                        </InputAdornment>
                    )
                }
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
