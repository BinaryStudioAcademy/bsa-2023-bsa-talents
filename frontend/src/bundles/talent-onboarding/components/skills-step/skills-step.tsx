import { FormHelperText, FormLabel } from '@mui/material';
import {
    type Control,
    type ControllerFieldState,
    type ControllerRenderProps,
    type FieldErrors,
    type FieldValues,
    useFieldArray,
    type UseFormHandleSubmit,
    type UseFormStateReturn,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import {
    EnglishLevel,
    NotConsidered,
    PreferredLanguages,
} from 'shared/build/index.js';

import {
    Button,
    Checkbox,
    FormControl,
    Grid,
    Input,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import { SkillsAutocomplete } from './skills-autocomplete.js';
import styles from './styles.module.scss';
import { type SkillsStepFormValues } from './types/skills-step-form-values.js';

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    getValues: () => T;
    handleSubmit: UseFormHandleSubmit<T>;
};

type Properties = {
    methods: ReturnValue<SkillsStepFormValues>;
    userInfo?: SkillsStepFormValues;
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
    const { fields, append } = useFieldArray({
        control,
        name: 'projectLinks',
    });

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<SkillsStepFormValues, 'notConsidered'>,
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
            field: ControllerRenderProps<SkillsStepFormValues, 'notConsidered'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<SkillsStepFormValues>;
        }): React.ReactElement => {
            return (
                <Grid
                    container
                    spacing={2}
                    className={getValidClassNames(
                        (styles.checkboxContainer, styles['MuiGrid-item']),
                    )}
                >
                    {notConsideredOptions.map((option) => (
                        <Grid item xs={6} key={option.value}>
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

    const renderProjectLinkInput = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<
                SkillsStepFormValues,
                `projectLinks.${number}.url`
            >;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<SkillsStepFormValues>;
        }): React.ReactElement => {
            const { ref, ...withoutReference } = field;
            return (
                <Input
                    {...withoutReference}
                    inputRef={ref}
                    control={control}
                    placeholder="link to BSA project"
                    type="text"
                    errors={{}}
                    adornmentText="www."
                />
            );
        },
        [control],
    );

    const appendProjectLinks = useCallback((): void => {
        append({ url: '' });
    }, [append]);

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
                    multiple
                    placeholder="Option"
                    control={control}
                    name={'preferredLanguages'}
                    options={preferredLanguagesOptions}
                />
                {errors.preferredLanguages && (
                    <FormHelperText className={styles.hasError}>
                        {errors.preferredLanguages.message}
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
                    <Typography variant={'label'}>Project links</Typography>
                </FormLabel>

                {fields.map((item, index) => {
                    const error = errors.projectLinks?.[index]?.url;
                    const message = error?.message;

                    return (
                        <Grid key={item.id} className={styles.projectLinks}>
                            <Controller
                                control={control}
                                name={`projectLinks.${index}.url`}
                                render={renderProjectLinkInput}
                            />
                            {Boolean(error) && (
                                <FormHelperText className={styles.hasError}>
                                    {message}
                                </FormHelperText>
                            )}
                        </Grid>
                    );
                })}

                <Button
                    variant="text"
                    type="button"
                    label="+ Add more links"
                    onClick={appendProjectLinks}
                    className={styles.buttonAddLink}
                />
            </FormControl>
        </FormControl>
    );
};

export { SkillsStep };
