import { FormHelperText } from '@mui/material';
import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Select,
    Slider,
    Textarea,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '~/bundles/talent-onboarding/enums/enums.js';
import {
    experienceYearsSliderMarks,
    realToSliderValue,
    sliderToRealValue,
} from '~/bundles/talent-onboarding/helpers/helpers.js';
import { type ProfileStepDto } from '~/bundles/talent-onboarding/types/types.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { useFormSubmit } from '../../context/context.js';
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
    const savedPayload = useSelector(
        (state: RootReducer) => state.talentOnBoarding,
    );

    const { control, handleSubmit, errors } = useAppForm<ProfileStepDto>({
        defaultValues: { ...savedPayload },
        validationSchema: ProfileStepValidationSchema,
    });

    const { setSubmitForm } = useFormSubmit();

    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        async (data: ProfileStepDto): Promise<boolean> => {
            await dispatch(actions.profileStep(data));
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

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<ProfileStepDto, 'employmentTypes'>,
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
            field: ControllerRenderProps<ProfileStepDto, 'employmentTypes'>;
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
        <FormControl className={styles.form}>
            <FormControl className={styles.formControl}>
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
            <FormControl className={styles.formControl}>
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
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Job title</Typography>
                </FormLabel>
                <Select
                    control={control}
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
            <FormControl className={styles.formControlSlider}>
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
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Current location</Typography>
                </FormLabel>
                <Select
                    control={control}
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
            <Grid className={styles.checkboxContainer}>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>Employment type</Typography>
                </FormLabel>
                <FormControl className={styles.formControlCheckbox}>
                    <Controller
                        control={control}
                        name="employmentTypes"
                        render={renderCheckboxes}
                    />
                </FormControl>
                {errors.employmentTypes && (
                    <FormHelperText className={styles.hasError}>
                        {errors.employmentTypes.message}
                    </FormHelperText>
                )}
            </Grid>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel} required>
                    <Typography variant={'label'}>
                        Briefly tell employers about your experience
                    </Typography>
                </FormLabel>
                <Textarea
                    placeholder="Tell us a little bit about yourself"
                    control={control}
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
        </FormControl>
    );
};

export { ProfileStep };
