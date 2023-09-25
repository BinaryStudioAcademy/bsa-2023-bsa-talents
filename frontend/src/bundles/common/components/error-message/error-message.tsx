import {
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { FormHelperText } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    errors: FieldErrors;
    name: FieldPath<T>;
    className?: string;
};

const ErrorMessage = <T extends FieldValues>({
    errors,
    name,
    className,
}: Properties<T>): JSX.Element => {
    return (
        <FormHelperText
            className={getValidClassNames(styles.hasError, className)}
        >
            {errors[name]?.message as string}
        </FormHelperText>
    );
};

export { ErrorMessage };
