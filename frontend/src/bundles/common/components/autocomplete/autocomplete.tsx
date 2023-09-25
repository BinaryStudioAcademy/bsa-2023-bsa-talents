import {
    Autocomplete,
    FormControl,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { type SyntheticEvent } from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { Chip } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { ErrorMessage } from '../error-message/error-message.js';
import styles from './styles.module.scss';

type Option = {
    label: string;
    value: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: Option[];
    isFilter?: boolean;
    placeholder?: string;
    label?: string;
};

const CustomAutocomplete = <T extends FieldValues>({
    name,
    control,
    options,
    isFilter = false,
    placeholder,
    label,
}: Properties<T>): JSX.Element => {
    const {
        field,
        formState: { errors },
    } = useFormController({ name, control });

    const { onChange, value, ...fieldPassProperties } = field;

    const renderInput = useCallback(
        (parameters: { inputProps: object; InputProps: object }) => {
            const { inputProps, InputProps } = parameters;
            return (
                <TextField
                    {...fieldPassProperties}
                    className={styles.inputRoot}
                    placeholder={placeholder}
                    inputProps={{
                        ...inputProps,
                        className: styles.input,
                    }}
                    InputProps={{
                        ...InputProps,
                        className: styles.inputWrapper,
                    }}
                />
            );
        },
        [fieldPassProperties, placeholder],
    );

    const renderDefaultTags = useCallback(() => null, []);

    const isOptionEqualToValue = useCallback(
        (option: Option, value: Option): boolean => {
            return option.value === value.value;
        },
        [],
    );

    const handleChange = useCallback(
        (event: SyntheticEvent, values: Option[]) => {
            event.preventDefault();
            onChange(values);
        },
        [onChange],
    );

    const handleDelete = useCallback(
        (deletedOption: Option) => () => {
            const updatedOptions = (value as Option[]).filter(
                (option) => option.value !== deletedOption.value,
            );
            onChange(updatedOptions);
        },
        [value, onChange],
    );

    return (
        <FormControl className={isFilter ? styles.formFilter : ''}>
            {!isFilter && (
                <FormLabel className={styles.label}>
                    <Typography variant={'label'}>{label}</Typography>
                    <span className={styles.requiredField}>*</span>
                </FormLabel>
            )}

            <Autocomplete<Option, true>
                multiple
                value={value as Option[]}
                renderInput={renderInput}
                options={options}
                renderTags={renderDefaultTags}
                popupIcon={null}
                clearIcon={null}
                isOptionEqualToValue={isOptionEqualToValue}
                onChange={handleChange}
            />

            {!isFilter && <ErrorMessage errors={errors} name={name} />}

            <div className={styles.chips}>
                {(value as Option[]).map((entry) => (
                    <Chip
                        key={entry.value}
                        label={entry.label}
                        onDelete={handleDelete(entry)}
                    />
                ))}
            </div>
        </FormControl>
    );
};

export { CustomAutocomplete };
