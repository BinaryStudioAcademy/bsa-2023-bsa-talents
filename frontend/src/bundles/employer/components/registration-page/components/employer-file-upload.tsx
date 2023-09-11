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
import { type EmployerRegistrationDto } from '~/bundles/employer/types/types.js';

import { ACCEPTED_PHOTO_TYPES } from '../constants/constants.js';
import styles from '../styles.module.scss';

type Properties = {
    control: Control<EmployerRegistrationDto>;
    name: FieldPath<EmployerRegistrationDto>;
};

const EmployerFileUpload: React.FC<Properties> = ({ name, control }) => {
    const {
        field,
        formState: { errors },
    } = useFormController({ name, control });

    const handleFileChange = useCallback(
        (field: ControllerRenderProps<EmployerRegistrationDto, typeof name>) =>
            (event: React.ChangeEvent<HTMLInputElement>): void => {
                const file = event.target.files?.[0];
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
                    Upload a profile photo
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
                        errors.photo?.message ? styles.btnError : '',
                    ),
                }}
                onChange={handleFileChange(field)}
            />

            <FormHelperText
                className={getValidClassNames(
                    styles.fileError,
                    styles.photoError,
                )}
            >
                {errors.photo?.type === 'fileSize' && errors.photo.message}
            </FormHelperText>
        </FormControl>
    );
};

export { EmployerFileUpload };
