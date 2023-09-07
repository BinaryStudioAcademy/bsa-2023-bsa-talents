import {
    type Control,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
    type UseFormStateReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

import {
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    EnglishLevel,
    NotConsidered,
    PreferredLanguages,
} from '~/bundles/talent-onboarding/enums/enums.js';
import { type SkillsStepDto } from '~/bundles/talent-onboarding/types/types.js';

import { SkillsAutocomplete } from './components/skills-autocomplete.js';
import { SkillsProjectLinks } from './components/skills-project-links.js';
import styles from './styles.module.scss';

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
};

type Properties = {
    methods: ReturnValue<SkillsStepDto>;
    userInfo?: SkillsStepDto;
};

const englishLevelOptions = Object.values(EnglishLevel).map((level) => ({
    value: level,
    label: level,
}));

const preferredLanguagesOptions = Object.values(PreferredLanguages).map(
    (language) => ({
        value: language,
        label: language,
    }),
);
const notConsideredOptions = Object.values(NotConsidered).map((option) => ({
    value: option,
    label: option,
}));

const SkillsStep: React.FC<Properties> = ({ methods }) => {
    const { control, errors } = methods;

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<SkillsStepDto, 'notConsidered'>,
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
            field: ControllerRenderProps<SkillsStepDto, 'notConsidered'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<SkillsStepDto>;
        }): React.ReactElement => {
            return (
                <Grid
                    container
                    spacing={2}
                    className={styles.checkboxContainer}
                >
                    {notConsideredOptions.map((option) => (
                        <Grid
                            item
                            xs={6}
                            key={option.value}
                            className={styles['MuiGrid-item']}
                        >
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
                        </Grid>
                    ))}
                </Grid>
            );
        },
        [handleCheckboxOnChange],
    );

    return (
        <FormControl className={styles.form}>
            <SkillsAutocomplete name="hardSkills" control={control} />

            <FormControl>
                <FormLabel className={styles.label}>
                    <Typography variant={'label'}>Level of English</Typography>
                    <span className={styles.requiredField}>*</span>
                </FormLabel>

                <Select
                    control={control}
                    options={englishLevelOptions}
                    name={'englishLevel'}
                    placeholder="Option"
                />

                {errors.englishLevel && (
                    <FormHelperText className={styles.hasError}>
                        {String(errors.englishLevel.message)}
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl>
                <FormLabel className={styles.label}>
                    <Typography variant={'label'}>I do not consider</Typography>
                    <span className={styles.requiredField}>*</span>
                </FormLabel>

                <Controller
                    control={control}
                    name="notConsidered"
                    render={renderCheckboxes}
                />

                {errors.notConsidered && (
                    <FormHelperText className={styles.hasError}>
                        {errors.notConsidered.message}
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl>
                <FormLabel
                    className={getValidClassNames(
                        styles.label,
                        styles.labelMargin,
                    )}
                >
                    <Typography variant={'label'}>
                        Preferred language of communication
                    </Typography>
                    <span className={styles.requiredField}>*</span>
                </FormLabel>
                <Select
                    isMulti
                    control={control}
                    placeholder="Option"
                    name={'preferredLanguages'}
                    options={preferredLanguagesOptions}
                />
                {errors.preferredLanguages && (
                    <FormHelperText className={styles.hasError}>
                        {errors.preferredLanguages.message}
                    </FormHelperText>
                )}
            </FormControl>
            <SkillsProjectLinks name={'projectLinks'} control={control} />
        </FormControl>
    );
};

export { SkillsStep };
