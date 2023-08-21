import { TextareaAutosize } from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    label: string;
    name: FieldPath<T>;
    minRows: number;
    maxRows: number;
    placeholder?: string;
};

const Textarea = <T extends FieldValues>({
    control,
    label,
    name,
    minRows,
    maxRows,
    placeholder = '',
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={field.name}>
                {label}
            </label>
            <TextareaAutosize
                {...field}
                minRows={minRows}
                maxRows={maxRows}
                className={styles.textarea}
                placeholder={placeholder}
            />
        </div>
    );
};

export { Textarea };
