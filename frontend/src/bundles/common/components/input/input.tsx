import { TextField } from '@mui/material';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

//import searchIcon from '~/assets/img/search.svg';
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
    disabled?: boolean;
};

const Input = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder = '',
    type = 'text',
    disabled = false,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    const generatedRootStyles = getValidClassNames(
        styles.root,
        disabled && styles.disabled,
        hasError && styles.error,
    );

    return (
        <label className={styles.wrapper}>
            <span className={disabled ? styles.labelDisabled : styles.label}>
                {label}
            </span>
            <TextField
                {...field}
                type={type}
                placeholder={placeholder}
                error={hasError}
                helperText={(error as string) || ' '}
                disabled={disabled}
                className={generatedRootStyles}
                InputProps={{ className: styles['MuiInputBase-root'] }}
                inputProps={{ className: styles['MuiInputBase-input'] }}
            />
        </label>
    );
};

export { Input };
