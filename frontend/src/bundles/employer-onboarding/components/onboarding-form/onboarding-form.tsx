import {
    ErrorMessage,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Select,
    Textarea,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { actions as cabinetActions } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
import { type RootReducer } from '~/framework/store/store.js';

import { Country } from '../../enums/enums.js';
import { actions as employerActions } from '../../store/employer-onboarding.js';
import {
    type EmployerOnboardingDto,
    type UserDetailsGeneralCustom,
} from '../../types/types.js';
import { EmployerOnboardingValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { EmployerFileUpload } from './components/employer-file-upload.js';
import { TEXTAREA } from './constants/constants.js';
import styles from './styles.module.scss';

const locationOptions = Object.values(Country).map((country) => ({
    value: country,
    label: country,
}));

const getEmployerOnBoardingState = (
    state: RootReducer,
): UserDetailsGeneralCustom => state.employerOnBoarding;

const getImageSource = (
    file?: File | null,
    url?: string | null,
): string | null => {
    if (file) {
        return URL.createObjectURL(file);
    }
    return url ?? null;
};

const OnboardingForm: React.FC = () => {
    const { setSubmitForm } = useFormSubmit();
    const {
        photo,
        fullName,
        employerPosition,
        companyName,
        companyWebsite,
        location,
        description,
        companyLogo,
        linkedinLink,
        photoUrl,
        companyLogoUrl,
    } = useAppSelector((rootState) => getEmployerOnBoardingState(rootState));

    const hasChangesInDetails = useAppSelector(
        (state: RootReducer) => state.cabinet.hasChangesInDetails,
    );
    const {
        control,
        getValues,
        handleSubmit,
        errors,
        watch,
        reset,
        setError,
        clearErrors,
    } = useAppForm<EmployerOnboardingDto>({
        defaultValues: useMemo(
            () => ({
                photo,
                fullName,
                employerPosition,
                companyName,
                companyWebsite,
                location,
                description,
                companyLogo,
                linkedinLink,
                photoUrl,
                companyLogoUrl,
            }),
            [
                companyLogo,
                companyLogoUrl,
                companyName,
                companyWebsite,
                description,
                employerPosition,
                fullName,
                linkedinLink,
                location,
                photo,
                photoUrl,
            ],
        ),
        validationSchema: EmployerOnboardingValidationSchema,
    });
    useEffect(() => {
        reset({
            photo,
            companyLogo,
            fullName,
            employerPosition,
            companyName,
            companyWebsite,
            location,
            description,
            photoUrl,
            companyLogoUrl,
            linkedinLink,
        });
    }, [
        fullName,
        linkedinLink,
        photo,
        employerPosition,
        companyName,
        companyWebsite,
        location,
        description,
        companyLogo,
        reset,
        companyLogoUrl,
        photoUrl,
    ]);
    const dispatch = useAppDispatch();

    const watchedValues = watch([
        'photo',
        'photoUrl',
        'fullName',
        'employerPosition',
        'companyName',
        'companyWebsite',
        'location',
        'description',
        'companyLogo',
        'companyLogoUrl',
        'linkedinLink',
    ]);

    useEffect(() => {
        const newValues = getValues([
            'photo',
            'photoUrl',
            'fullName',
            'employerPosition',
            'companyName',
            'companyWebsite',
            'location',
            'description',
            'companyLogo',
            'companyLogoUrl',
            'linkedinLink',
        ]);
        const initialValues = {
            photoUrl,
            fullName,
            employerPosition,
            companyName,
            companyWebsite,
            location,
            description,
            companyLogoUrl,
            linkedinLink,
        };
        const hasChanges =
            JSON.stringify(Object.values(initialValues)) !==
            JSON.stringify(newValues);
        if (hasChangesInDetails !== hasChanges) {
            dispatch(cabinetActions.setHasChangesInDetails(hasChanges));
        }
    }, [
        companyName,
        companyWebsite,
        description,
        dispatch,
        fullName,
        getValues,
        linkedinLink,
        location,
        employerPosition,
        watchedValues,
        hasChangesInDetails,
        photo,
        companyLogo,
        photoUrl,
        companyLogoUrl,
    ]);

    const { currentUser } = useAppSelector((state: RootReducer) => state.auth);

    const handleFormSubmit = useCallback(
        (data: EmployerOnboardingDto): boolean => {
            void dispatch(
                employerActions.saveEmployerDetails({
                    ...data,
                    userId: currentUser?.id,
                }),
            );
            return true;
        },
        [dispatch, currentUser?.id],
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

    const ImageDisplay = ({
        file,
        url,
        alt,
    }: {
        file?: File | null;
        url?: string | null;
        alt: string;
    }): JSX.Element | null => {
        const source = getImageSource(file, url);
        return source ? (
            <img src={source} className={styles.photoElement} alt={alt} />
        ) : null;
    };
    return (
        <FormControl className={styles.formWrapper}>
            <Grid className={styles.form}>
                <Grid className={styles.formFields}>
                    <FormControl className={styles.formField}>
                        <FormLabel required>
                            <Typography variant="label">Full Name</Typography>
                        </FormLabel>

                        <Input
                            errors={errors}
                            name="fullName"
                            control={control}
                            placeholder="Full Name"
                            className={styles.formInput}
                        />
                    </FormControl>

                    <FormControl className={styles.formField}>
                        <FormLabel required>
                            <Typography variant="label">
                                Your position
                            </Typography>
                        </FormLabel>
                        <Input
                            name="employerPosition"
                            errors={errors}
                            control={control}
                            placeholder="Position"
                            className={styles.formInput}
                        />
                    </FormControl>

                    <FormControl className={styles.formField}>
                        <FormLabel required>
                            <Typography variant="label">
                                Linkedin profile
                            </Typography>
                        </FormLabel>
                        <Input
                            errors={errors}
                            control={control}
                            placeholder="Link"
                            name="linkedinLink"
                            className={styles.formInput}
                        />
                    </FormControl>
                    <FormControl className={styles.formField}>
                        <FormLabel required>
                            <Typography variant="label">
                                Company name
                            </Typography>
                        </FormLabel>
                        <Input
                            errors={errors}
                            control={control}
                            placeholder="Name"
                            name="companyName"
                            className={styles.formInput}
                        />
                    </FormControl>

                    <FormControl className={styles.formField}>
                        <FormLabel required>
                            <Typography variant="label">
                                Company website
                            </Typography>
                        </FormLabel>
                        <Input
                            errors={errors}
                            control={control}
                            placeholder="Link"
                            name="companyWebsite"
                            className={styles.formInput}
                        />
                    </FormControl>

                    <FormControl className={styles.formField}>
                        <FormLabel required>
                            <Typography variant="label">Location</Typography>
                        </FormLabel>
                        <Grid className={styles.formInput}>
                            <Select
                                control={control}
                                errors={errors}
                                name={'location'}
                                placeholder="Option"
                                options={locationOptions}
                            />
                            <ErrorMessage errors={errors} name="location" />
                        </Grid>
                    </FormControl>

                    <FormControl className={styles.formTextarea}>
                        <FormLabel className={styles.textareaLabel} required>
                            <Typography variant="label">
                                Briefly tell about your company and its values
                            </Typography>
                        </FormLabel>
                        <Textarea
                            minRows={TEXTAREA.minRows}
                            maxRows={TEXTAREA.maxRows}
                            control={control}
                            errors={errors}
                            placeholder="Text"
                            name={'description'}
                        />
                        <ErrorMessage errors={errors} name="description" />
                    </FormControl>
                </Grid>

                <Grid className={styles.photoContainer}>
                    <Grid container className={styles.photo}>
                        <Grid item className={styles.photoWrapper}>
                            <ImageDisplay
                                file={watch('photo')}
                                url={photoUrl}
                                alt="Profile"
                            />
                        </Grid>
                        <EmployerFileUpload
                            label="Upload a photo"
                            control={control}
                            name="photo"
                            setError={setError}
                            clearErrors={clearErrors}
                        />
                    </Grid>
                    <Grid container className={styles.photo}>
                        <Grid item className={styles.photoWrapper}>
                            <ImageDisplay
                                file={watch('companyLogo')}
                                url={companyLogoUrl}
                                alt="Company logo"
                            />
                        </Grid>
                        <EmployerFileUpload
                            label="Upload a company logo"
                            control={control}
                            name="companyLogo"
                            setError={setError}
                            clearErrors={clearErrors}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
};

export { OnboardingForm };
