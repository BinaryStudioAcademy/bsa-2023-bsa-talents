import { FormControl, MenuItem, Select as MuiSelect } from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type Path,
    type PathValue,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import arrowIcon from '../../../../assets/img/select-arrow.svg';
import styles from './select.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: { value: string | number; label: string }[];
    multiple?: boolean;
};

const ArrowIcon = (): JSX.Element => {
    return <img className={styles.icon} src={arrowIcon} alt="arrow icon" />;
};

const Select = <T extends FieldValues>({
    control,
    name,
    options,
    multiple,
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
        <FormControl className={styles.container}>
            <MuiSelect
                {...field}
                multiple={multiple}
                IconComponent={ArrowIcon}
                className={styles.input}
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
