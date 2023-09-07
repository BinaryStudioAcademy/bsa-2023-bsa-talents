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

    const SECOND_ELEMENT_INDEX = 1;

    const handleSelectChange = useCallback(
        (selected: string | number | (string | number)[]) => {
            if (
                !selected ||
                (Array.isArray(selected) &&
                    selected.length === SECOND_ELEMENT_INDEX)
            ) {
                return <em className={styles.placeholder}>{placeholder}</em>;
            }

            if (isMulti && Array.isArray(selected)) {
                return selected
                    .filter(Boolean)
                    .map((value: string | number) => (
                        <span key={value} className={styles.option}>
                            {
                                options.find((item) => item.value === value)
                                    ?.label
                            }
                            ,&nbsp;
                        </span>
                    ));
            }

            if (selected) {
                return (
                    <span className={styles.option}>
                        {options.find((item) => item.value === selected)?.label}
                    </span>
                );
            }
        },
        [isMulti, options, placeholder],
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
