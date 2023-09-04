import { MenuItem, Select as MuiSelect } from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type Path,
    type PathValue,
} from 'react-hook-form';

import arrowIcon from '~/assets/img/select-arrow.svg';
import { useFormController } from '~/bundles/common/hooks/hooks.js';

import { FormControl, FormLabel } from '../components.js';
import styles from './select.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: { value: string | number; label: string }[];
    placeholder?: string;
    label?: string;
    multiple?: boolean;
    hasError?: boolean;
    isDisabled?: boolean;
};

const ArrowIcon = (): JSX.Element => {
    return <img className={styles.icon} src={arrowIcon} alt="arrow icon" />;
};

const Select = <T extends FieldValues>({
    control,
    name,
    options,
    label,
    multiple,
    hasError,
    isDisabled,
    placeholder = 'Placeholder',
}: Properties<T>): JSX.Element => {
    const firstElementIndex = 0;
    const { field } = useFormController({
        name,
        control,
        defaultValue: (multiple
            ? [options[firstElementIndex].value]
            : options[firstElementIndex].value) as PathValue<T, Path<T>>,
    });

    return (
        <FormControl
            className={styles.container}
            hasError={hasError}
            isDisabled={isDisabled}
        >
            <FormLabel>{label}</FormLabel>
            <MuiSelect
                {...field}
                multiple={multiple}
                IconComponent={ArrowIcon}
                className={styles.input}
            >
                {!multiple && (
                    <MenuItem className={styles.placeholder} disabled value=" ">
                        {placeholder}
                    </MenuItem>
                )}
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                        className={styles.dropdown}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export { Select };
