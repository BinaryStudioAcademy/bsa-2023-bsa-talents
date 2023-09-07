import { TextareaAutosize } from '@mui/material';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    name: FieldPath<T>;
    minRows: number;
    maxRows: number;
    placeholder?: string;
    className?: string;
};

const Textarea = <T extends FieldValues>({
    control,
    name,
    placeholder = '',
    className,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    return (
        <TextareaAutosize
            {...field}
            className={getValidClassNames(styles.textarea, className)}
            placeholder={placeholder}
            {...props}
        />
    );
};

export { Textarea };
