import {
    AccountCircle as AccountCircleIcon,
    Add as PlusIcon,
} from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
    Button,
    Controller,
    FileUpload,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Tooltip,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
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
// import { actions as lmsActions } from '~/bundles/lms/store/lms.js';
import { actions as cabinetActions } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
import { type RootReducer } from '~/framework/store/store.js';

import { OnboardingStep } from '../../enums/enums.js';
import { validateFileSize, validateFileType } from '../../helpers/helpers.js';
import { actions as talentActions } from '../../store/talent-onboarding.js';
import { type ContactsCVStepDto } from '../../types/types.js';
import { ContactsCVStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import {
    ACCEPTED_CV_TYPES,
    ACCEPTED_PHOTO_TYPES,
} from './constants/constants.js';
import styles from './styles.module.scss';

const ContactsCVStep: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state: RootReducer) => state.auth);
    const {
        fullName,
        phone,
        linkedinLink,
        photo,
        photoUrl,
        cv,
        cvUrl,
        cvName,
    } = useAppSelector((state: RootReducer) => state.talentOnBoarding);

    // useEffect(() => {
    //     const userId = currentUser?.id as string;
    //     void dispatch(lmsActions.getTalentLmsData({ userId }));
    // }, [currentUser?.id, dispatch]);

    const hasChangesInDetails = useAppSelector(
        (state: RootReducer) => state.cabinet.hasChangesInDetails,
    );

    const talentLMSInfo = useAppSelector(
        (state: RootReducer) => state.lms.lmsData?.talent,
    );
    const {
        control,
        getValues,
        handleSubmit,
        errors,
        setError,
        watch,
        clearErrors,
    } = useAppForm<ContactsCVStepDto>({
        defaultValues: useMemo(
            () => ({
                fullName: fullName ?? talentLMSInfo?.fullName,
                phone: phone ?? talentLMSInfo?.phoneNumber,
                linkedinLink,
                photo,
                photoUrl,
                cv,
                cvUrl,
                cvName,
            }),
            [
                cv,
                cvName,
                cvUrl,
                fullName,
                linkedinLink,
                phone,
                photo,
                photoUrl,
                talentLMSInfo?.fullName,
                talentLMSInfo?.phoneNumber,
            ],
        ),
        validationSchema: ContactsCVStepValidationSchema,
    });

    const { setSubmitForm } = useFormSubmit();

    const watchedValues = watch([
        'fullName',
        'phone',
        'linkedinLink',
        'photo',
        'photoUrl',
        'cv',
        'cvUrl',
        'cvName',
    ]);

    useEffect(() => {
        const newValues = getValues([
            'fullName',
            'phone',
            'linkedinLink',
            'photo',
            'photoUrl',
            'cv',
            'cvUrl',
            'cvName',
        ]);
        const initialValues = {
            fullName,
            phone,
            linkedinLink,
            photo,
            photoUrl,
            cv,
            cvUrl,
            cvName,
        };
        const hasChanges =
            JSON.stringify(Object.values(initialValues)) !==
            JSON.stringify(newValues);
        if (hasChangesInDetails !== hasChanges) {
            dispatch(cabinetActions.setHasChangesInDetails(hasChanges));
        }
    }, [
        cv,
        cvName,
        cvUrl,
        dispatch,
        fullName,
        getValues,
        hasChangesInDetails,
        linkedinLink,
        phone,
        photo,
        photoUrl,
        watchedValues,
    ]);

    const handleFormSubmit = useCallback(
        (data: ContactsCVStepDto): boolean => {
            void dispatch(
                talentActions.updateTalentDetails({
                    ...data,
                    userId: currentUser?.id,
                    completedStep: OnboardingStep.STEP_04,
                }),
            );
            return true;
        },
        [currentUser?.id, dispatch],
    );

    useEffect(() => {
        setSubmitForm(() => {
            return async () => {
                let result = false;
                await handleSubmit((formData) => {
                    result = handleFormSubmit(formData);
                })();
                return result;
            };
        });
        return () => {
            setSubmitForm(null);
        };
    }, [handleSubmit, handleFormSubmit, setSubmitForm]);

    const [photoURL, setPhotoURL] = useState<string>(photoUrl ?? '');
    const [cvURL, setCvURL] = useState<string>(cvUrl ?? '');

    useEffect(() => {
        if (photoUrl) {
            setPhotoURL(photoUrl);
        }
        if (cvUrl) {
            setCvURL(cvUrl);
        }
    }, [photoUrl, cvUrl, cvName]);

    const handlePhotoFileChange = useCallback(
        (field: ControllerRenderProps<ContactsCVStepDto, 'photo'>) =>
            (event: React.ChangeEvent<HTMLInputElement>): boolean => {
                if (!event.target.files) {
                    return false;
                }

                const [file] = event.target.files;

                try {
                    validateFileSize({
                        name: 'photo',
                        file,
                        setError,
                        clearErrors,
                    });

                    setPhotoURL(URL.createObjectURL(file));
                    field.onChange(file);
                    clearErrors('photoUrl');
                    return true;
                } catch {
                    setPhotoURL('');
                    return false;
                }
            },
        [clearErrors, setError],
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
                        errors.photoUrl?.message ?? errors.photo?.message
                            ? styles.btnError
                            : '',
                    ),
                }}
                onChange={handlePhotoFileChange(field)}
            />
        ),
        [
            errors.photo?.message,
            errors.photoUrl?.message,
            handlePhotoFileChange,
        ],
    );

    const handleCVFileChange = useCallback(
        (field: ControllerRenderProps<ContactsCVStepDto, 'cv'>) =>
            (event: React.ChangeEvent<HTMLInputElement>): boolean => {
                if (!event.target.files) {
                    return false;
                }

                const [file] = event.target.files;

                field.onChange(null);

                try {
                    validateFileSize({
                        name: 'cv',
                        file,
                        setError,
                        clearErrors,
                    });
                    validateFileType({
                        name: 'cv',
                        file,
                        setError,
                        clearErrors,
                    });
                    setCvURL(URL.createObjectURL(file));
                    field.onChange(file);
                    clearErrors('cvUrl');
                    return true;
                } catch {
                    setCvURL('');
                    return false;
                }
            },
        [clearErrors, setError],
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
                        errors.cv?.message ?? errors.cvUrl?.message
                            ? styles.btnError
                            : '',
                    ),
                    startIcon: <PlusIcon />,
                }}
                onChange={handleCVFileChange(field)}
            />
        ),
        [errors.cv?.message, errors.cvUrl?.message, handleCVFileChange],
    );

    const handleLinkClick = useCallback((): void => {
        window.open(cvURL, '_blank');
    }, [cvURL]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(photoURL);
            URL.revokeObjectURL(cvURL);
        };
    }, [photoURL, cvURL]);

    return (
        <>
            <Grid container className={styles.photo}>
                {photoURL ? (
                    <Grid
                        item
                        className={styles.photoWrapper}
                        style={{
                            backgroundImage: `url(${photoURL})`,
                        }}
                    ></Grid>
                ) : (
                    <AccountCircleIcon className={styles.iconWrapper} />
                )}
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
                <FormLabel className={styles.label} required>
                    <Typography variant="label" className={styles.labelText}>
                        Full name
                    </Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="Name Name"
                    type="text"
                    errors={errors}
                    name={'fullName'}
                />
            </FormControl>

            <FormControl className={styles.formControl}>
                <FormLabel className={styles.label} required>
                    <Typography variant="label" className={styles.labelText}>
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
                <FormLabel className={styles.label} required>
                    <Typography variant="label" className={styles.labelText}>
                        LinkedIn profile
                    </Typography>
                </FormLabel>

                <Input
                    control={control}
                    placeholder="link to your LinkedIn"
                    type="text"
                    errors={errors}
                    name={'linkedinLink'}
                    adornmentText="www."
                />
            </FormControl>

            <div>
                <FormControl className={styles.formControl}>
                    <FormLabel className={styles.label} required>
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
                        {(errors.cv?.type === 'fileSize' ||
                            errors.cv?.type === 'fileType') &&
                            errors.cv.message}
                    </FormHelperText>
                </FormControl>

                {(watch('cv') ?? cvName) && (
                    <Grid className={styles.cv}>
                        <Typography variant="caption">
                            Attached file:
                        </Typography>
                        <Tooltip title={cvURL}>
                            <div>
                                <Button
                                    label={watch('cv')?.name ?? cvName}
                                    variant="text"
                                    className={styles.cvLink}
                                    onClick={handleLinkClick}
                                />
                            </div>
                        </Tooltip>
                    </Grid>
                )}
            </div>

            <Typography variant="caption" className={styles.info}>
                Job search is anonymous. This information will be seen only in
                case you share it.
            </Typography>
        </>
    );
};

export { ContactsCVStep };
