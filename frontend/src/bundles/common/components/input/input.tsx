import { InputAdornment, TextField } from '@mui/material';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import searchIcon from '~/assets/img/search.svg';
import { useFormController } from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type InputType = 'text' | 'email' | 'password' | 'search';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
    placeholder?: string;
    type?: InputType;
    isDisabled?: boolean;
    adornmentText?: string;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder = '',
    type = 'text',
    isDisabled = false,
    adornmentText = '',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    const generatedRootStyles = getValidClassNames(
        styles.root,
        isDisabled && styles.disabled,
        hasError && styles.error,
        adornmentText && styles.hasAdornsment,
    );

    let adornment = null;
    if (type === 'search') {
        const iconAdornmentStyles = getValidClassNames(
            styles['MuiInputAdornment-root'],
            styles.adornmentIcon,
        );
        adornment = (
            <InputAdornment position="start" className={iconAdornmentStyles}>
                <img src={searchIcon} alt="search" />
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

    return (
        <label className={styles.wrapper}>
            <span className={isDisabled ? styles.labelDisabled : styles.label}>
                {label}
            </span>
            <TextField
                {...field}
                type={type}
                placeholder={placeholder}
                error={hasError}
                helperText={(error as string) || ' '}
                disabled={isDisabled}
                className={generatedRootStyles}
                InputProps={{
                    className: getValidClassNames(
                        styles['MuiInputBase-root'],
                        styles['MuiOutlinedInput-root'],
                    ),
                    startAdornment: adornment,
                }}
                inputProps={{ className: styles['MuiInputBase-input'] }}
            />
        </label>
    );
};

export { Input };
