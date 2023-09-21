import {
    FormControl,
    FormHelperText,
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

import { CountryList } from '../../enums/enums.js';
import { actions as employerActions } from '../../store/employer-onboarding.js';
import {
    type EmployerOnboardingDto,
    type UserDetailsGeneralCustom,
} from '../../types/types.js';
import { EmployerOnboardingValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { EmployerFileUpload } from './components/employer-file-upload.js';
import styles from './styles.module.scss';

const locationOptions = Object.values(CountryList).map((country) => ({
    value: country,
    label: country,
}));

const getEmployerOnBoardingState = (
    state: RootReducer,
): UserDetailsGeneralCustom => state.employerOnBoarding;

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
    } = useAppSelector((rootState) => getEmployerOnBoardingState(rootState));

    const hasChangesInDetails = useAppSelector(
        (state: RootReducer) => state.cabinet.hasChangesInDetails,
    );
    const { control, getValues, handleSubmit, errors, watch, reset } =
        useAppForm<EmployerOnboardingDto>({
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
                }),
                [
                    companyLogo,
                    companyName,
                    companyWebsite,
                    description,
                    employerPosition,
                    fullName,
                    linkedinLink,
                    location,
                    photo,
                ],
            ),
            validationSchema: EmployerOnboardingValidationSchema,
            mode: 'onSubmit',
        });
    useEffect(() => {
        reset({
            photo,
            fullName,
            employerPosition,
            companyName,
            companyWebsite,
            location,
            description,
            companyLogo,
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
    ]);
    const dispatch = useAppDispatch();

    const watchedValues = watch([
        'photo',
        'fullName',
        'employerPosition',
        'companyName',
        'companyWebsite',
        'location',
        'description',
        'companyLogo',
        'linkedinLink',
    ]);

    useEffect(() => {
        const newValues = getValues([
            'photo',
            'fullName',
            'employerPosition',
            'companyName',
            'companyWebsite',
            'location',
            'description',
            'companyLogo',
            'linkedinLink',
        ]);
        const initialValues = {
            photo,
            fullName,
            employerPosition,
            companyName,
            companyWebsite,
            location,
            description,
            companyLogo,
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
    ]);

    const { currentUser } = useAppSelector((state: RootReducer) => state.auth);

    const onSubmit = useCallback(
        async (data: EmployerOnboardingDto): Promise<boolean> => {
            const {
                fullName,
                employerPosition,
                companyName,
                companyWebsite,
                location,
                description,
                linkedinLink,
            } = data;
            await dispatch(
                employerActions.saveEmployerDetails({
                    fullName,
                    employerPosition,
                    companyName,
                    companyWebsite,
                    location,
                    description,
                    linkedinLink,
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

    const renderFileUrl = useCallback(
        ({ file }: { file: File | null }): React.CSSProperties | undefined => {
            if (file) {
                return {
                    backgroundImage: `url(${URL.createObjectURL(file)})`,
                };
            }
        },
        [],
    );

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
                            {errors.location && (
                                <FormHelperText className={styles.hasError}>
                                    {`${errors.location.message}`}
                                </FormHelperText>
                            )}
                        </Grid>
                    </FormControl>

                    <FormControl className={styles.formTextarea}>
                        <FormLabel className={styles.textareaLabel}>
                            <Typography variant="label">
                                Briefly tell about your company and its values
                            </Typography>
                        </FormLabel>
                        <Textarea
                            minRows={7}
                            maxRows={9}
                            control={control}
                            errors={errors}
                            placeholder="Text"
                            name={'description'}
                        />
                        {errors.description && (
                            <FormHelperText className={styles.hasError}>
                                {`${errors.description.message}`}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid className={styles.photoContainer}>
                    <Grid container className={styles.photo}>
                        <Grid
                            item
                            className={styles.photoWrapper}
                            style={renderFileUrl({
                                file: errors.photo ? null : watch('photo'),
                            })}
                        ></Grid>

                        <EmployerFileUpload
                            label="Uphoad a photo"
                            control={control}
                            name="photo"
                        />
                    </Grid>
                    <Grid container className={styles.photo}>
                        <Grid
                            item
                            className={styles.photoWrapper}
                            style={renderFileUrl({
                                file: errors.companyLogo
                                    ? null
                                    : watch('companyLogo'),
                            })}
                        ></Grid>
                        <EmployerFileUpload
                            label="Upload a company logo"
                            control={control}
                            name="companyLogo"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </FormControl>
    );
};

export { OnboardingForm };
