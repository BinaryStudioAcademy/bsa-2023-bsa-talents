import { FormHelperText } from '@mui/material';

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
    { value: 20, label: '20' },
    { value: 40, label: '40' },
    { value: 60, label: '60' },
    { value: 80, label: '80' },
    { value: 100, label: '100' },
];
const optionsSelect = [
    { value: 0, label: 'Option' },
    { value: '20', label: '20' },
    { value: '40', label: '40' },
];
const EMPTY_OBJECT_LENGTH = 0;
const FirstStep: React.FC<Properties> = ({ onSubmit }) => {
    const [experience, setExperience] = useState<number>(
        DEFAULT_SIGN_UP_PAYLOAD_STEP1.experienceYears,
    );
    const [employmentTypes, setEmploymentTypes] = useState<string[]>(
        DEFAULT_SIGN_UP_PAYLOAD_STEP1.employmentTypes,
    );
    const [hasError, setHasError] = useState<boolean>(false);
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD_STEP1,
        validationSchema: signUpStep1ValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (formData: UserSignUpStep1Dto): void => {
            formData.experienceYears = experience;
            formData.employmentTypes = employmentTypes;
            onSubmit(formData);
        },
        [onSubmit, experience, employmentTypes],
    );
    useEffect(() => {
        if (Object.keys(errors).length === EMPTY_OBJECT_LENGTH) {
            setHasError(false);
        } else {
            setHasError(true);
        }
    }, [errors]);

    const handleSliderChange = useCallback(
        (event: Event, newValue: number | number[]): void => {
            if (typeof newValue === 'number') {
                setExperience(newValue);
            }
        },
        [setExperience],
    );

    const handleCheckedCheckboxes = useCallback(
        (
            event: React.ChangeEvent<HTMLInputElement>,
            checked: boolean,
        ): void => {
            const checkboxValue = event.target.value;
            if (checked) {
                setEmploymentTypes((employmentTypes) => [
                    ...employmentTypes,
                    checkboxValue,
                ]);
            } else {
                setEmploymentTypes((employmentTypes) =>
                    employmentTypes.filter((type) => type !== checkboxValue),
                );
            }
        },
        [setEmploymentTypes],
    );

    const handleValidateBeforeSubmit = useCallback((): void => {
        void handleSubmit(handleFormSubmit)();
    }, [handleSubmit, handleFormSubmit]);
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
                />
                <Typography variant={'label'}>Job title*</Typography>
                <Select
                    control={control}
                    name={'jobTitle'}
                    options={optionsSelect}
                />
                <Typography variant={'label'}>Experience*</Typography>
                <Slider
                    marks={options}
                    value={40}
                    onChange={handleSliderChange}
                    step={null}
                    sliderClass=""
                />
                <Typography variant={'label'}>Current location*</Typography>
                <Select
                    control={control}
                    name={'location'}
                    options={optionsSelect}
                />
                <Typography variant={'label'}>Employment type*</Typography>
                {options.map((option) => (
                    <Checkbox
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        onChange={handleCheckedCheckboxes}
                    />
                ))}
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
