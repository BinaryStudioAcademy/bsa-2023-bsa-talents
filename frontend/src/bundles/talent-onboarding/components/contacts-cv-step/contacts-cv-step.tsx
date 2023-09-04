import { Add as PlusIcon } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type UseFormSetError,
    type UseFormWatch,
} from 'react-hook-form';

import {
    FileUpload,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { validateFileSize } from '../../helpers/validate-file-size.js';
import { type ContactsCVStepDto } from '../../types/types.js';
import {
    ACCEPTED_CV_TYPES,
    ACCEPTED_PHOTO_TYPES,
    REQUIRED,
} from './constants/constants.js';
import styles from './styles.module.scss';

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    watch: UseFormWatch<T>;
    setError: UseFormSetError<T>;
};

type Properties = {
    methods: ReturnValue<ContactsCVStepDto>;
};

const ContactsCVStep: React.FC<Properties> = ({ methods }) => {
    const { control, errors, watch, setError } = methods;

    const [photoURL, setPhotoURL] = useState<string>('');

    const handlePhotoFileChange = useCallback(
        (file: File): boolean => {
            try {
                validateFileSize('photo', file, setError);
                setPhotoURL(URL.createObjectURL(file));
                return true;
            } catch {
                return false;
            }
        },
        [setError],
    );

    const handleCVFileChange = useCallback(
        (file: File): boolean => {
            try {
                validateFileSize('cv', file, setError);
                return true;
            } catch {
                return false;
            }
        },
        [setError],
    );

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(photoURL);
        };
    }, [photoURL]);

    return (
        <FormControl className={styles.form}>
            <Grid container className={styles.photo}>
                <Grid
                    item
                    className={styles.photoWrapper}
                    style={{
                        backgroundImage: `url(${photoURL})`,
                    }}
                ></Grid>

                <FormControl
                    className={getValidClassNames(
                        styles.formControl,
                        styles.photoFormControl,
                    )}
                >
                    <FormLabel className={styles.label}>
                        <Typography
                            variant="label"
                            className={styles.labelText}
                        >
                            Upload a new photo
                        </Typography>
                    </FormLabel>

                    <FileUpload
                        control={control}
                        name="photo"
                        accept={ACCEPTED_PHOTO_TYPES.join(',')}
                        buttonProps={{
                            label: 'Choose photo',
                            className: getValidClassNames(
                                styles.uploadPhotoBtn,
                                errors.photo?.message ? styles.btnError : '',
                            ),
                        }}
                        handleFileChange={handlePhotoFileChange}
                    />
                    <FormHelperText
                        className={getValidClassNames(
                            styles.fileError,
                            styles.photoError,
                        )}
                    >
                        {errors.photo?.type === 'fileSize' &&
                            errors.photo.message}
                    </FormHelperText>
                </FormControl>
            </Grid>

            <FormControl className={styles.formControl}>
                <FormLabel
                    className={getValidClassNames(
                        styles.label,
                        errors.fullName?.type === REQUIRED
                            ? styles.labelError
                            : '',
                    )}
                    required
                >
                    <Typography variant={'label'} className={styles.labelText}>
                        Full name
                    </Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="Name"
                    type="text"
                    errors={errors}
                    name={'fullName'}
                />
            </FormControl>

            <FormControl className={styles.formControl}>
                <FormLabel
                    className={getValidClassNames(
                        styles.label,
                        errors.phoneNumber?.type === REQUIRED
                            ? styles.labelError
                            : '',
                    )}
                    required
                >
                    <Typography variant={'label'} className={styles.labelText}>
                        Phone number
                    </Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="+38000 000 00 00"
                    type="text"
                    errors={errors}
                    name={'phoneNumber'}
                />
            </FormControl>

            <FormControl className={styles.formControl}>
                <FormLabel
                    className={getValidClassNames(
                        styles.label,
                        errors.linkedInLink?.type === REQUIRED
                            ? styles.labelError
                            : '',
                    )}
                    required
                >
                    <Typography variant={'label'} className={styles.labelText}>
                        LinkedIn profile
                    </Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="link to your LinkedIn"
                    type="text"
                    errors={errors}
                    name={'linkedInLink'}
                    adornmentText="www"
                />
            </FormControl>

            <div>
                <FormControl className={styles.formControl}>
                    <FormLabel
                        className={getValidClassNames(
                            styles.label,
                            errors.cv?.type === 'object.base'
                                ? styles.labelError
                                : '',
                        )}
                        required
                    >
                        <Typography
                            variant="label"
                            className={styles.labelText}
                        >
                            CV
                        </Typography>
                    </FormLabel>
                    <FileUpload
                        control={control}
                        name="cv"
                        accept={ACCEPTED_CV_TYPES.join(',')}
                        buttonProps={{
                            label: 'Choose file',
                            className: getValidClassNames(
                                styles.uploadCVBtn,
                                errors.cv?.message ? styles.btnError : '',
                            ),
                            startIcon: <PlusIcon />,
                        }}
                        handleFileChange={handleCVFileChange}
                    />
                    <FormHelperText className={styles.fileError}>
                        {errors.cv?.type === 'fileSize' && errors.cv.message}
                    </FormHelperText>
                </FormControl>

                {watch('cv') && (
                    <Typography variant="caption">
                        Attached file: {watch('cv')?.name}
                    </Typography>
                )}
            </div>

            <Typography variant="caption" className={styles.info}>
                Job search is anonymous. This information will be seen only in
                case you share it.
            </Typography>
        </FormControl>
    );
};

export { ContactsCVStep };
