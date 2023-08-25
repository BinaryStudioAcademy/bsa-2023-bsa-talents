import { TextField } from '@mui/material';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
    placeholder?: string;
    type?: 'text' | 'email';
};

const InputFactory = <T extends FieldValues>(): React.FC<Properties<T>> => {
    const Input: React.FC<Properties<T>> = ({
        control,
        errors,
        label,
        name,
        placeholder = '',
        type = 'text',
    }) => {
        const { field } = useFormController({ name, control });

        const error = errors[name]?.message;
        const hasError = Boolean(error);

        return (
            <label>
                <span>{label}</span>
                <TextField
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    error={hasError}
                    helperText={error as string}
                />
            </label>
        );
    };

    return Input;
};

export { InputFactory };
