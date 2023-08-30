import { FormHelperText } from '@mui/material';
import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';

import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    Input,
    Select,
    Slider,
    Textarea,
    Typography,
} from '~/bundles/common/components/components.js';
import { InputVariant } from '~/bundles/common/enums/enums.js';
import {
    useAppForm,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpStep1Dto } from '~/bundles/sign-up/types/types.js';
import { signUpStep1ValidationSchema } from '~/bundles/sign-up/validation-schemas/validation-schemas.js';

import { DEFAULT_SIGN_UP_PAYLOAD_STEP1 } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: UserSignUpStep1Dto) => void;
};
const options = [
    { value: 0, label: '0' },
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' },
    { value: 80, label: '80' },
    { value: 100, label: '100' },
];
const optionsSelect = [
    { value: 'Option', label: 'Option' },
    { value: '20', label: '20' },
    { value: '40', label: '40' },
];
const EMPTY_OBJECT_LENGTH = 0;
const FirstStep: React.FC<Properties> = ({ onSubmit }) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD_STEP1,
        validationSchema: signUpStep1ValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (formData: UserSignUpStep1Dto): void => {
            onSubmit(formData);
        },
        [onSubmit],
    );
    useEffect(() => {
        if (Object.keys(errors).length === EMPTY_OBJECT_LENGTH) {
            setHasError(false);
        } else {
            setHasError(true);
        }
    }, [errors]);

    const handleValidateBeforeSubmit = useCallback((): void => {
        void handleSubmit(handleFormSubmit)();
    }, [handleSubmit, handleFormSubmit]);

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
                    {optionsSelect.map((option) => (
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
                    marks={options}
                    step={null}
                />
            );
        },
        [],
    );

    return (
        <>
            <FormControl hasError={hasError} variant={InputVariant.OUTLINED}>
                <Typography variant={'label'}>Profile name*</Typography>
                <Input
                    control={control}
                    placeholder='ex. "Java scripter" or ".Net hard-worker"'
                    type="text"
                    errors={errors}
                    name={'profileName'}
                />
                <Typography variant={'label'}>Salary expectations*</Typography>
                <Input
                    control={control}
                    placeholder="0000"
                    type="text"
                    errors={errors}
                    name={'salaryExpectation'}
                    adornmentText="$"
                />
                <Typography variant={'label'}>Job title*</Typography>
                <Select
                    control={control}
                    name={'jobTitle'}
                    options={optionsSelect}
                />
                <Typography variant={'label'}>Experience*</Typography>
                {/* <Slider
                    marks={options}
                    value={40}
                    onChange={handleSliderChange}
                    step={null}
                /> */}
                <FormControl>
                    <Controller
                        control={control}
                        name="experienceYears"
                        render={renderSlider}
                    />
                </FormControl>
                <Typography variant={'label'}>Current location*</Typography>
                <Select
                    control={control}
                    name={'location'}
                    options={optionsSelect}
                />
                <Typography variant={'label'}>Employment type*</Typography>
                <FormControl>
                    <Controller
                        control={control}
                        name="employmentTypes"
                        render={renderCheckboxes}
                    />
                </FormControl>
                <Typography variant={'label'}>
                    Briefly tell employers about your experience*
                </Typography>
                <Textarea
                    placeholder="Tell us a little bit about yourself"
                    control={control}
                    name={'description'}
                    minRows={3}
                    maxRows={5}
                />
                <Grid>
                    <Button label="Back" variant="contained" disabled />
                    <Button
                        label="Next"
                        variant="contained"
                        type="submit"
                        onClick={handleValidateBeforeSubmit}
                    />
                </Grid>
                {hasError && (
                    <FormHelperText>
                        {
                            Object.values(errors).map((error) => error.message)[
                                EMPTY_OBJECT_LENGTH
                            ]
                        }
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
};

export { FirstStep };
