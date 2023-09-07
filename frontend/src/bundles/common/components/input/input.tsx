import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type InputType = 'text' | 'email' | 'password' | 'search';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    name: FieldPath<T>;
    placeholder?: string;
    type?: InputType;
    isRequired?: boolean;
    isDisabled?: boolean;
    adornmentText?: string;
    className?: string;
    inputClassNames?: string;
    defaultValue?: string;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    name,
    placeholder = '',
    type = 'text',
    isRequired = false,
    isDisabled = false,
    adornmentText = '',
    className = '',
    inputClassNames,
    defaultValue,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    let adornment = null;
    if (type === 'search') {
        const iconAdornmentStyles = getValidClassNames(
            styles['MuiInputAdornment-root'],
            styles.adornmentIcon,
        );
        adornment = (
            <InputAdornment position="start" className={iconAdornmentStyles}>
                <Search />
            </InputAdornment>
        );
    }
    if (adornmentText) {
        const textAdornmentStyles = getValidClassNames(
            styles['MuiInputAdornment-root'],
            styles.adornmentText,
        );
        adornment = (
            <InputAdornment position="start" className={textAdornmentStyles}>
                {adornmentText}
            </InputAdornment>
        );
    }

    const textFieldRootStyles = getValidClassNames(styles.root, className);
    const muiInputStyles = getValidClassNames(
        styles.inputWrapper,
        isDisabled && styles.inputDisabled,
        hasError && styles.hasError,
        inputClassNames,
    );
    const htmlInputStyles = getValidClassNames(
        styles.input,
        type === 'search' && styles.inputPaddingSearch,
        adornmentText && styles.inputPaddingTextAdornsment,
        inputClassNames,
    );
    const helperTextStyles = getValidClassNames(
        styles.helperText,
        hasError && styles.hasError,
    );

    return (
        <TextField
            {...field}
            type={type}
            placeholder={placeholder}
            error={hasError}
            helperText={(error as string) || ' '}
            className={textFieldRootStyles}
            required={isRequired}
            InputProps={{
                className: muiInputStyles,
                disabled: isDisabled,
                startAdornment: adornment,
            }}
            inputProps={{ className: htmlInputStyles }}
            FormHelperTextProps={{ className: helperTextStyles }}
            defaultValue={defaultValue}
        />
    );
};

export { Input };
