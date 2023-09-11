import { Add as PlusIcon } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';

import {
    Controller,
    FileUpload,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
} from '~/bundles/common/hooks/hooks.js';
import {
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from '~/bundles/common/types/types.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { useFormSubmit } from '../../context/context.js';
import { validateFileSize } from '../../helpers/helpers.js';
import { actions } from '../../store/talent-onboarding.js';
import { type ContactsCVStepDto } from '../../types/types.js';
import { ContactsCVStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import {
    ACCEPTED_CV_TYPES,
    ACCEPTED_PHOTO_TYPES,
    REQUIRED,
} from './constants/constants.js';
import styles from './styles.module.scss';

const ContactsCVStep: React.FC = () => {
    const { photo, fullName, phone, linkedinLink, cv } = useAppSelector(
        (state: RootReducer) => state.talentOnBoarding,
    );

    const { control, handleSubmit, errors, setError, watch } =
        useAppForm<ContactsCVStepDto>({
            defaultValues: {
                photo,
                fullName,
                phone,
                linkedinLink,
                cv,
            },
            validationSchema: ContactsCVStepValidationSchema,
        });

    const { setSubmitForm } = useFormSubmit();

    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        async (data: ContactsCVStepDto): Promise<boolean> => {
            await dispatch(actions.updateTalentDetails(data));
            return true;
        },
        [dispatch],
    );

    useEffect(() => {
        setSubmitForm(() => {
            return async () => {
                let result = false;
                await handleSubmit(async (formData) => {
                    result = await onSubmit(formData);
                })();
                return result;
            };
        });
        return () => {
            setSubmitForm(null);
        };
    }, [handleSubmit, onSubmit, setSubmitForm]);

    const [photoURL, setPhotoURL] = useState<string>('');

    const handlePhotoFileChange = useCallback(
        (field: ControllerRenderProps<ContactsCVStepDto, 'photo'>) =>
            (event: React.ChangeEvent<HTMLInputElement>): boolean => {
                if (!event.target.files) {
                    return false;
                }

                const [file] = event.target.files;

                try {
                    validateFileSize('photo', file, setError);

                    setPhotoURL(URL.createObjectURL(file));

                    field.onChange(file);
                    return true;
                } catch {
                    return false;
                }
            },
        [setError],
    );

    const renderPhotoInput = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<ContactsCVStepDto, 'photo'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<ContactsCVStepDto>;
        }): JSX.Element => (
            <FileUpload
                {...{
                    onChange: field.onChange,
                    name: field.name,
                }}
                accept={ACCEPTED_PHOTO_TYPES.join(',')}
                buttonProps={{
                    label: 'Choose photo',
                    className: getValidClassNames(
                        styles.uploadPhotoBtn,
                        errors.photo?.message ? styles.btnError : '',
                    ),
                }}
                onChange={handlePhotoFileChange(field)}
            />
        ),
        [errors.photo?.message, handlePhotoFileChange],
    );

    const handleCVFileChange = useCallback(
        (field: ControllerRenderProps<ContactsCVStepDto, 'cv'>) =>
            (event: React.ChangeEvent<HTMLInputElement>): boolean => {
                if (!event.target.files) {
                    return false;
                }

                const [file] = event.target.files;

                try {
                    validateFileSize('cv', file, setError);
                    field.onChange(file);
                    return true;
                } catch {
                    return false;
                }
            },
        [setError],
    );

    const renderCVInput = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<ContactsCVStepDto, 'cv'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<ContactsCVStepDto>;
        }): JSX.Element => (
            <FileUpload
                {...{
                    onChange: field.onChange,
                    name: field.name,
                }}
                accept={ACCEPTED_CV_TYPES.join(',')}
                buttonProps={{
                    label: 'Choose file',
                    className: getValidClassNames(
                        styles.uploadCVBtn,
                        errors.cv?.message ? styles.btnError : '',
                    ),
                    startIcon: <PlusIcon />,
                }}
                onChange={handleCVFileChange(field)}
            />
        ),
        [errors.cv?.message, handleCVFileChange],
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

                    <Controller
                        control={control}
                        name="photo"
                        render={renderPhotoInput}
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
                        errors.phone?.type === REQUIRED
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
                    name={'phone'}
                />
            </FormControl>

            <FormControl className={styles.formControl}>
                <FormLabel
                    className={getValidClassNames(
                        styles.label,
                        errors.linkedinLink?.type === REQUIRED
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
                    name={'linkedinLink'}
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
                    <Controller
                        control={control}
                        name="cv"
                        render={renderCVInput}
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
