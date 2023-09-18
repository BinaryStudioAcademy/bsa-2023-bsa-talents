import { AccountCircle, InsertPhotoOutlined } from '@mui/icons-material';

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
import { type RootReducer } from '~/framework/store/store.js';

import { CountryList } from '../../enums/enums.js';
import { actions } from '../../store/employer-onboarding.js';
import { type EmployerOnboardingDto } from '../../types/types.js';
import { EmployerOnboardingValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { EmployerFileUpload } from './components/employer-file-upload.js';
import styles from './styles.module.scss';

const locationOptions = Object.values(CountryList).map((country) => ({
    value: country,
    label: country,
}));

const OnboardingForm: React.FC = () => {
    const {
        //photo,
        fullName,
        position,
        companyName,
        companyWebsite,
        location,
        description,
        //companyLogo,
        linkedInLink,
    } = useAppSelector((state: RootReducer) => state.employerOnBoarding);

    const { control, getValues, handleSubmit, errors, watch } =
        useAppForm<EmployerOnboardingDto>({
            defaultValues: useMemo(
                () => ({
                    //photo,
                    fullName,
                    position,
                    companyName,
                    companyWebsite,
                    location,
                    description,
                    //companyLogo,
                    linkedInLink,
                }),
                [
                    //photo,
                    fullName,
                    position,
                    companyName,
                    companyWebsite,
                    location,
                    description,
                    //companyLogo,
                    linkedInLink,
                ],
            ),
            validationSchema: EmployerOnboardingValidationSchema,
            mode: 'onChange',
        });

    const dispatch = useAppDispatch();
    const { setSubmitForm } = useFormSubmit();

    const watchedValues = watch([
        //'photo',
        'fullName',
        'position',
        'companyName',
        'companyWebsite',
        'location',
        'description',
        //'companyLogo',
        'linkedInLink',
    ]);

    useEffect(() => {
        const newValues = getValues([
            //'photo',
            'fullName',
            'position',
            'companyName',
            'companyWebsite',
            'location',
            'description',
            //'companyLogo',
            'linkedInLink',
        ]);
        const initialValues = {
            // photo,
            fullName,
            position,
            companyName,
            companyWebsite,
            location,
            description,
            // companyLogo,
            linkedInLink,
        };
        const hasChanges =
            JSON.stringify(Object.values(initialValues)) !==
            JSON.stringify(newValues);
        dispatch(actions.setHasChangesInDetails(hasChanges));
    }, [
        companyName,
        companyWebsite,
        description,
        dispatch,
        fullName,
        getValues,
        linkedInLink,
        location,
        position,
        watchedValues,
    ]);

    const onSubmit = useCallback(
        async (data: EmployerOnboardingDto): Promise<boolean> => {
            await dispatch(actions.createEmployerDetails(data));
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
                        <FormLabel>
                            <Typography
                                variant="label"
                                className={styles.formLabel}
                            >
                                Full Name
                                <span className={styles.requiredField}>*</span>
                            </Typography>
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
                        <FormLabel>
                            <Typography
                                variant="label"
                                className={styles.formLabel}
                            >
                                Your position
                                <span className={styles.requiredField}>*</span>
                            </Typography>
                        </FormLabel>
                        <Input
                            name="position"
                            errors={errors}
                            control={control}
                            placeholder="Position"
                            className={styles.formInput}
                        />
                    </FormControl>

                    <FormControl className={styles.formField}>
                        <FormLabel>
                            <Typography
                                variant="label"
                                className={styles.formLabel}
                            >
                                Linkedin profile
                                <span className={styles.requiredField}>*</span>
                            </Typography>
                        </FormLabel>
                        <Input
                            errors={errors}
                            control={control}
                            placeholder="Link"
                            name="linkedInLink"
                            className={styles.formInput}
                        />
                    </FormControl>

                    <FormControl className={styles.formField}>
                        <FormLabel>
                            <Typography
                                variant="label"
                                className={styles.formLabel}
                            >
                                Company name
                                <span className={styles.requiredField}>*</span>
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
                        <FormLabel>
                            <Typography
                                variant="label"
                                className={styles.formLabel}
                            >
                                Company website
                                <span className={styles.requiredField}>*</span>
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
                        <FormLabel>
                            <Typography
                                variant="label"
                                className={styles.formLabel}
                            >
                                Location
                                <span className={styles.requiredField}>*</span>
                            </Typography>
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
                            style={renderFileUrl({ file: watch('photo') })}
                        >
                            {!watch('photo') && (
                                <AccountCircle className={styles.photoIcon} />
                            )}
                        </Grid>

                        <EmployerFileUpload
                            label="Upload a photo"
                            control={control}
                            name="photo"
                        />
                    </Grid>
                    <Grid container className={styles.photo}>
                        <Grid
                            item
                            className={styles.photoWrapper}
                            style={renderFileUrl({
                                file: watch('companyLogo'),
                            })}
                        >
                            {!watch('companyLogo') && (
                                <InsertPhotoOutlined
                                    className={styles.photoWrapper}
                                />
                            )}
                        </Grid>

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
