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
    name: FieldPath<T>;
    minRows: number;
    maxRows: number;
    placeholder?: string;
};

const TextareaFactory = <T extends FieldValues>(): React.FC<Properties<T>> => {
    const Textarea: React.FC<Properties<T>> = ({
        control,
        name,
        placeholder = '',
        ...props
    }) => {
        const { field } = useFormController({ name, control });

        return (
            <TextareaAutosize
                {...field}
                className={styles.textarea}
                placeholder={placeholder}
                {...props}
            />
        );
    };

    return Textarea;
};

export { TextareaFactory };
