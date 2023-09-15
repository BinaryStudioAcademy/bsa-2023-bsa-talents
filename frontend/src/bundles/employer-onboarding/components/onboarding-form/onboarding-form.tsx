import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Select,
    Textarea,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';

import { CountryList } from '../../enums/enums.js';
import { actions } from '../../store/employer-onboarding.js';
import { type EmployerOnboardingDto } from '../../types/types.js';
import { EmployerOnboardingValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { EmployerFileUpload } from './components/employer-file-upload.js';
import { DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

const locationOptions = Object.values(CountryList).map((country) => ({
    value: country,
    label: country,
}));

const OnboardingForm: React.FC = () => {
    const { control, handleSubmit, errors, watch } =
        useAppForm<EmployerOnboardingDto>({
            defaultValues: DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD,
            validationSchema: EmployerOnboardingValidationSchema,
            mode: 'onChange',
        });

    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        async (data: EmployerOnboardingDto): Promise<boolean> => {
            await dispatch(actions.createEmployerDetails(data));
            return true;
        },
        [dispatch],
    );

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

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
        <Grid className={styles.container}>
            <Grid className={styles.paragraph}>
                <Typography variant="h2">
                    Create a profile to find a perfect match to your company
                </Typography>
                <Typography variant="body1" className={styles.body}>
                    Please, fill out all the fields below, so we could verify
                    your company.
                </Typography>
            </Grid>

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
                                    <span className={styles.requiredField}>
                                        *
                                    </span>
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
                                    <span className={styles.requiredField}>
                                        *
                                    </span>
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
                                    <span className={styles.requiredField}>
                                        *
                                    </span>
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
                                    <span className={styles.requiredField}>
                                        *
                                    </span>
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
                                    <span className={styles.requiredField}>
                                        *
                                    </span>
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
                                    <span className={styles.requiredField}>
                                        *
                                    </span>
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
                                    Briefly tell about your company and its
                                    values
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
                                label="Uphoad a company logo"
                                control={control}
                                name="companyLogo"
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    onClick={handleFormSubmit}
                    label="Submit for verification"
                    className={getValidClassNames(
                        styles.buttonRegistration,
                        styles.submitButton,
                    )}
                />
            </FormControl>
        </Grid>
    );
};

export { OnboardingForm };
