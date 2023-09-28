import {
    type Control,
    type ControllerRenderProps,
    type FieldPath,
    type UseFormClearErrors,
    type UseFormSetError,
} from 'react-hook-form';

import {
    ErrorMessage,
    FileUpload,
    FormControl,
    FormLabel,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';
import { validateFileSize } from '~/bundles/talent-onboarding/helpers/helpers.js';

import { type EmployerOnboardingDto } from '../../../types/types.js';
import { ACCEPTED_PHOTO_TYPES } from '../constants/constants.js';
import styles from '../styles.module.scss';

type Properties = {
    label: string;
    control: Control<EmployerOnboardingDto>;
    setError: UseFormSetError<EmployerOnboardingDto>;
    clearErrors: UseFormClearErrors<EmployerOnboardingDto>;
    name: FieldPath<EmployerOnboardingDto>;
};

const EmployerFileUpload: React.FC<Properties> = ({
    label,
    name,
    control,
    clearErrors,
    setError,
}) => {
    const {
        field,
        formState: { errors },
    } = useFormController({ name, control });

    const handleFileChange = useCallback(
        (field: ControllerRenderProps<EmployerOnboardingDto, typeof name>) =>
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                if (!event.target.files) {
                    return;
                }

                const [file] = event.target.files;

                try {
                    validateFileSize({
                        name: field.name,
                        file,
                        setError,
                        clearErrors,
                    });
                    field.onChange(file);
                    return;
                } catch {
                    return;
                }
            },
        [clearErrors, setError],
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

            <ErrorMessage
                errors={errors}
                name={name}
                className={getValidClassNames(
                    styles.fileError,
                    styles.photoError,
                )}
            />
        </FormControl>
    );
};

export { EmployerFileUpload };
