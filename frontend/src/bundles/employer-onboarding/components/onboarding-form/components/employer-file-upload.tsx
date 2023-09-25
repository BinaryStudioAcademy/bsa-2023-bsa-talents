import {
    type Control,
    type ControllerRenderProps,
    type FieldPath,
} from 'react-hook-form';

import {
    FileUpload,
    FormControl,
    FormHelperText,
    FormLabel,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { type EmployerOnboardingDto } from '../../../types/types.js';
import { ACCEPTED_PHOTO_TYPES } from '../constants/constants.js';
import styles from '../styles.module.scss';

const FIRST_ELEMENT = 0;

type Properties = {
    label: string;
    control: Control<EmployerOnboardingDto>;
    name: FieldPath<EmployerOnboardingDto>;
};

const EmployerFileUpload: React.FC<Properties> = ({ label, name, control }) => {
    const {
        field,
        formState: { errors },
    } = useFormController({ name, control });

    const handleFileChange = useCallback(
        (field: ControllerRenderProps<EmployerOnboardingDto, typeof name>) =>
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                const file = event.target.files?.[FIRST_ELEMENT];
                field.onChange(file);
            },
        [],
    );

    return (
        <FormControl
            className={getValidClassNames(
                styles.formControl,
                styles.photoFormControl,
            )}
        >
            <FormLabel className={styles.label}>
                <Typography variant="label" className={styles.labelText}>
                    {label}
                </Typography>
            </FormLabel>

            <FileUpload
                {...{
                    onChange: field.onChange,
                    name,
                }}
                accept={ACCEPTED_PHOTO_TYPES.join(',')}
                buttonProps={{
                    label: 'Choose photo',
                    className: getValidClassNames(
                        styles.uploadPhotoBtn,
                        errors[name]?.message ? styles.btnError : '',
                    ),
                }}
                onChange={handleFileChange(field)}
            />

            {errors[name] && (
                <FormHelperText
                    className={getValidClassNames(
                        styles.fileError,
                        styles.photoError,
                    )}
                >
                    {`${errors[name]?.message}`}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export { EmployerFileUpload };
