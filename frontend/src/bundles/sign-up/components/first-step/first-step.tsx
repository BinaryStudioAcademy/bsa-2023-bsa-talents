import { FormHelperText } from '@mui/material';
import {
    type Control,
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type UseFormStateReturn,
} from 'react-hook-form';

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
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '~/bundles/sign-up/enums/enums.js';
import {
    experienceYearsScaled,
    experienceYearsSliderMarks,
} from '~/bundles/sign-up/helpers/helpers.js';
import { type UserSignUpStep1Dto } from '~/bundles/sign-up/types/types.js';

import { DEFAULT_SIGN_UP_PAYLOAD_STEP1 } from './constants/constants.js';
import styles from './styles.module.scss';

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
};

type Properties = {
    methods: ReturnValue<UserSignUpStep1Dto>;
    userInfo?: UserSignUpStep1Dto;
};
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

const FirstStep: React.FC<Properties> = ({ methods }) => {
    const { control, errors } = methods;

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<UserSignUpStep1Dto, 'employmentTypes'>,
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
            field: ControllerRenderProps<UserSignUpStep1Dto, 'employmentTypes'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<UserSignUpStep1Dto>;
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
        (field: ControllerRenderProps<UserSignUpStep1Dto, 'experienceYears'>) =>
            (event: Event): void => {
                const mouseEvent = event as MouseEvent;
                const inputElement = mouseEvent.target as HTMLInputElement;
                const newValue = inputElement.value;
                const exactExperienceObject = experienceYearsScaled.find(
                    (experience) =>
                        experience.scaledValue === Number.parseInt(newValue),
                );
                const exactExperienceValue = exactExperienceObject
                    ? exactExperienceObject.value
                    : DEFAULT_SIGN_UP_PAYLOAD_STEP1.experienceYears;
                field.onChange(exactExperienceValue);
            },
        [],
    );

    const renderSlider = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<UserSignUpStep1Dto, 'experienceYears'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<UserSignUpStep1Dto>;
        }): React.ReactElement => {
            return (
                <Slider
                    {...{
                        onChange: field.onChange,
                        onBlur: field.onBlur,
                        name: field.name,
                        value: field.value,
                    }}
                    className={styles.track}
                    classes={styles}
                    value={DEFAULT_SIGN_UP_PAYLOAD_STEP1.experienceYears}
                    marks={experienceYearsSliderMarks}
                    step={null}
                    onChange={handleSliderOnChange(field)}
                />
            );
        },
        [handleSliderOnChange],
    );

    return (
        <FormControl className={styles.form}>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel}>
                    <Typography variant={'label'}>
                        Profile name
                        <span className={styles.requiredField}>*</span>
                    </Typography>
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
                <FormLabel className={styles.formLabel}>
                    <Typography variant={'label'}>
                        Salary expectations
                        <span className={styles.requiredField}>*</span>
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
                <FormLabel className={styles.formLabel}>
                    <Typography variant={'label'}>
                        Job title<span className={styles.requiredField}>*</span>
                    </Typography>
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
                <FormLabel className={styles.formLabel}>
                    <Typography variant={'label'}>
                        Experience
                        <span className={styles.requiredField}>*</span>
                    </Typography>
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
                <FormLabel className={styles.formLabel}>
                    <Typography variant={'label'}>
                        Current location
                        <span className={styles.requiredField}>*</span>
                    </Typography>
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
                <FormLabel className={styles.formLabel}>
                    <Typography variant={'label'}>
                        Employment type
                        <span className={styles.requiredField}>*</span>
                    </Typography>
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
                <FormLabel className={styles.formLabel}>
                    <Typography variant={'label'}>
                        Briefly tell employers about your experience
                        <span className={styles.requiredField}>*</span>
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

export { FirstStep };
