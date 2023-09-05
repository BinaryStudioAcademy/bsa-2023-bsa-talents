import { MenuItem, Select as MuiSelect } from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type Path,
    type PathValue,
} from 'react-hook-form';

import arrowIcon from '~/assets/img/select-arrow.svg';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { FormControl, FormLabel } from '../components.js';
import styles from './styles.module.scss';

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
    const FIRST_ELEMENT_INDEX = 0;
    const SECOND_ELEMENT_INDEX = 1;

    const { field } = useFormController({
        name,
        control,
        defaultValue: (multiple
            ? [options[FIRST_ELEMENT_INDEX].value]
            : options[FIRST_ELEMENT_INDEX].value) as PathValue<T, Path<T>>,
    });

    const handleSelectChange = useCallback(
        (selected: PathValue<T, Path<T>>): React.ReactNode => {
            if (Array.isArray(selected)) {
                if (
                    selected[FIRST_ELEMENT_INDEX] === ' ' &&
                    selected.length === SECOND_ELEMENT_INDEX
                ) {
                    return (
                        <span className={styles.placeholder}>
                            {placeholder}
                        </span>
                    );
                }
                return selected
                    .slice(SECOND_ELEMENT_INDEX)
                    .map((value: string | number) => (
                        <span key={value} className={styles.option}>
                            {
                                options.find((item) => item.value === value)
                                    ?.label
                            }
                            ,&nbsp;
                        </span>
                    ));
            } else if (
                selected === ' ' ||
                selected[FIRST_ELEMENT_INDEX] === ' '
            ) {
                return (
                    <span className={styles.placeholder}>{placeholder}</span>
                );
            } else {
                return (
                    <span className={styles.option}>
                        {options.find((item) => item.value === selected)?.label}
                    </span>
                );
            }
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
                multiple={multiple}
                IconComponent={ArrowIcon}
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
