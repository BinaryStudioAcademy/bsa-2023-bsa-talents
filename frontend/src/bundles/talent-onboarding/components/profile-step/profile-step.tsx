import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';

import {
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Select,
    Slider,
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
import {
    CountryList,
    EmploymentType,
    JobTitle,
    OnboardingSteps,
} from '~/bundles/talent-onboarding/enums/enums.js';
import {
    experienceYearsSliderMarks,
    realToSliderValue,
    sliderToRealValue,
} from '~/bundles/talent-onboarding/helpers/helpers.js';
import { type ProfileStepDto } from '~/bundles/talent-onboarding/types/types.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { actions } from '../../store/talent-onboarding.js';
import { ProfileStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

const jobTitleOptions = Object.values(JobTitle).map((title) => ({
    value: title,
    label: title,
}));
const locationOptions = Object.values(CountryList).map((country) => ({
    value: country,
    label: country,
}));
const employmentTypeOptions = Object.values(EmploymentType).map((type) => ({
    value: type,
    label: type,
}));

const ProfileStep: React.FC = () => {
    const {
        profileName,
        salaryExpectation,
        jobTitle,
        location,
        experienceYears,
        employmentType,
        description,
    } = useAppSelector((state: RootReducer) => state.talentOnBoarding);

    const { control, handleSubmit, errors, reset } = useAppForm<ProfileStepDto>(
        {
            defaultValues: useMemo(
                () => ({
                    profileName,
                    salaryExpectation,
                    jobTitle,
                    location,
                    experienceYears,
                    employmentType,
                    description,
                }),
                [
                    profileName,
                    salaryExpectation,
                    jobTitle,
                    location,
                    experienceYears,
                    employmentType,
                    description,
                ],
            ),
            validationSchema: ProfileStepValidationSchema,
        },
    );

    useEffect(() => {
        reset({
            profileName,
            salaryExpectation,
            jobTitle,
            location,
            experienceYears,
            employmentType,
            description,
        });
    }, [
        description,
        employmentType,
        experienceYears,
        jobTitle,
        location,
        profileName,
        reset,
        salaryExpectation,
    ]);

    const { setSubmitForm } = useFormSubmit();

    const dispatch = useAppDispatch();

    const { currentUser } = useAppSelector((state: RootReducer) => state.auth);

    const onSubmit = useCallback(
        async (data: ProfileStepDto): Promise<boolean> => {
            await dispatch(
                actions.saveTalentDetails({
                    ...data,
                    userId: currentUser?.id,
                    completedStep: OnboardingSteps.STEP_01,
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

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<ProfileStepDto, 'employmentType'>,
            selectedValue: string,
        ) =>
            (): void => {
                const updatedValue = field.value.includes(selectedValue)
                    ? field.value.filter((item) => item !== selectedValue)
                    : [...field.value, selectedValue];
                field.onChange(updatedValue);
            },
        [],
    );

    const renderCheckboxes = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<ProfileStepDto, 'employmentType'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<ProfileStepDto>;
        }): React.ReactElement => {
            return (
                <>
                    {employmentTypeOptions.map((option) => (
                        <Checkbox
                            {...{
                                onChange: field.onChange,
                                onBlur: field.onBlur,
                                name: field.name,
                                value: field.value,
                            }}
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            isChecked={field.value.includes(option.value)}
                            onChange={handleCheckboxOnChange(
                                field,
                                option.value,
                            )}
                        />
                    ))}
                </>
            );
        },
        [handleCheckboxOnChange],
    );

    const handleSliderOnChange = useCallback(
        (field: ControllerRenderProps<ProfileStepDto, 'experienceYears'>) =>
            (event: Event, value: number | number[]): void => {
                if (typeof value == 'number') {
                    field.onChange(sliderToRealValue(value));
                }
            },
        [],
    );

    const renderSlider = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<ProfileStepDto, 'experienceYears'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<ProfileStepDto>;
        }): React.ReactElement => {
            return (
                <Slider
                    name={field.name}
                    className={styles.track}
                    classes={styles}
                    marks={experienceYearsSliderMarks}
                    step={null}
                    onChange={handleSliderOnChange({ ...field })}
                    value={realToSliderValue(field.value)}
                />
            );
        },
        [handleSliderOnChange],
    );

    return (
        <>
            <FormControl>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Profile name</Typography>
                </FormLabel>
                <Input
                    control={control}
                    placeholder='ex. "Java scripter" or ".Net hard-worker"'
                    type="text"
                    errors={errors}
                    name={'profileName'}
                />
            </FormControl>
            <FormControl>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>
                        Salary expectations
                    </Typography>
                </FormLabel>
                <Input
                    control={control}
                    placeholder="0000"
                    type="text"
                    errors={errors}
                    name={'salaryExpectation'}
                    adornmentText="$"
                />
            </FormControl>
            <FormControl>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Job title</Typography>
                </FormLabel>
                <Select
                    control={control}
                    errors={errors}
                    name={'jobTitle'}
                    options={jobTitleOptions}
                    placeholder="Option"
                />
                {errors.jobTitle && (
                    <FormHelperText className={styles.hasError}>
                        {errors.jobTitle.message}
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Experience</Typography>
                </FormLabel>
                <Controller
                    control={control}
                    name="experienceYears"
                    render={renderSlider}
                />
                {errors.experienceYears && (
                    <FormHelperText className={styles.hasError}>
                        {errors.experienceYears.message}
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Current Location</Typography>
                </FormLabel>
                <Select
                    control={control}
                    errors={errors}
                    name={'location'}
                    options={locationOptions}
                    placeholder="Option"
                />
                {errors.location && (
                    <FormHelperText className={styles.hasError}>
                        {errors.location.message}
                    </FormHelperText>
                )}
            </FormControl>
            <Grid>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Employment type</Typography>
                </FormLabel>
                <FormControl className={styles.formControlCheckbox}>
                    <Controller
                        control={control}
                        name="employmentType"
                        render={renderCheckboxes}
                    />
                </FormControl>
                {errors.employmentType && (
                    <FormHelperText className={styles.hasError}>
                        {errors.employmentType.message}
                    </FormHelperText>
                )}
            </Grid>
            <FormControl>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>
                        Briefly tell employers about your experience
                    </Typography>
                </FormLabel>
                <Textarea
                    placeholder="Tell us a little bit about yourself"
                    control={control}
                    errors={errors}
                    name={'description'}
                    minRows={7}
                    maxRows={9}
                />
                {errors.description && (
                    <FormHelperText className={styles.hasError}>
                        {errors.description.message}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
};

export { ProfileStep };
