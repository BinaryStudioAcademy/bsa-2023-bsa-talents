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
import { type UserSignUpStep1Dto } from '~/bundles/sign-up/types/types.js';

import {
    DEFAULT_SIGN_UP_PAYLOAD_STEP1,
    sliderMarks,
} from './constants/constants.js';
import styles from './styles.module.scss';

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
};

type Properties = {
    methods: ReturnValue<UserSignUpStep1Dto>;
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

    const handleCheckboxChange = useCallback(
        (
            field: ControllerRenderProps<UserSignUpStep1Dto, 'employmentTypes'>,
            selectedValue: string,
        ): void => {
            const updatedValue = field.value.includes(selectedValue)
                ? field.value.filter((item) => item !== selectedValue)
                : [...field.value, selectedValue];
            field.onChange(updatedValue);
        },
        [],
    );

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<UserSignUpStep1Dto, 'employmentTypes'>,
            selectedValue: string,
        ) =>
            (): void => {
                handleCheckboxChange(field, selectedValue);
            },
        [handleCheckboxChange],
    );

    const renderCheckboxes = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<UserSignUpStep1Dto, 'employmentTypes'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<UserSignUpStep1Dto>;
        }): React.ReactElement => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, ...newField } = field;
            return (
                <>
                    {employmentTypeOptions.map((option) => (
                        <Checkbox
                            {...newField}
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

    const renderSlider = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<UserSignUpStep1Dto, 'experienceYears'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<UserSignUpStep1Dto>;
        }): React.ReactElement => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, ...newField } = field;
            return (
                <Slider
                    {...newField}
                    value={DEFAULT_SIGN_UP_PAYLOAD_STEP1.experienceYears}
                    marks={sliderMarks}
                    step={null}
                />
            );
        },
        [],
    );

    return (
        <>
            <FormControl>
                <FormControl className={styles.formControl}>
                    <FormLabel>
                        <Typography variant={'label'}>Profile name*</Typography>
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
                    <FormLabel>
                        <Typography variant={'label'}>
                            Salary expectations*
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
                    <FormLabel>
                        <Typography variant={'label'}>Job title*</Typography>
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
                <FormControl className={styles.formControl}>
                    <FormLabel>
                        <Typography variant={'label'}>Experience*</Typography>
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
                    <FormLabel>
                        <Typography variant={'label'}>
                            Current location*
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
                <FormControl className={styles.formControl}>
                    <FormLabel>
                        <Typography variant={'label'}>
                            Employment type*
                        </Typography>
                    </FormLabel>
                    <Controller
                        control={control}
                        name="employmentTypes"
                        render={renderCheckboxes}
                    />
                    {errors.employmentTypes && (
                        <FormHelperText className={styles.hasError}>
                            {errors.employmentTypes.message}
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl className={styles.formControl}>
                    <FormLabel>
                        <Typography variant={'label'}>
                            Briefly tell employers about your experience*
                        </Typography>
                    </FormLabel>
                    <Textarea
                        placeholder="Tell us a little bit about yourself"
                        control={control}
                        name={'description'}
                        minRows={3}
                        maxRows={5}
                    />
                    {errors.description && (
                        <FormHelperText className={styles.hasError}>
                            {errors.description.message}
                        </FormHelperText>
                    )}
                </FormControl>
            </FormControl>
        </>
    );
};

export { FirstStep };
