import {
    Autocomplete,
    FormControl,
    FormHelperText,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { type Control, type FieldPath } from 'react-hook-form';

import { Chip } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';
import { type SkillsStepDto } from '~/bundles/talent-onboarding/types/types.js';

import styles from '../styles.module.scss';

type Properties = {
    control: Control<SkillsStepDto>;
    name: FieldPath<SkillsStepDto>;
};

type Option = {
    label: string;
    value: string;
};

// mock data, will get this from db
const hardSkillsOptions: Option[] = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Ruby', label: 'Ruby' },
];

const SkillsAutocomplete: React.FC<Properties> = ({ name, control }) => {
    const {
        field,
        formState: { errors },
    } = useFormController({ name, control });

    const { onChange, value, ...fieldPassProperties } = field;

    const renderInput = useCallback(
        (parameters: { inputProps: object; InputProps: object }) => {
            const { inputProps, InputProps } = parameters;
            return (
                <TextField
                    {...fieldPassProperties}
                    className={styles.inputRoot}
                    placeholder="Start typing and select skills"
                    inputProps={{
                        ...inputProps,
                        className: styles.input,
                    }}
                    InputProps={{
                        ...InputProps,
                        className: styles.inputWrapper,
                    }}
                />
            );
        },
        [fieldPassProperties],
    );

    const hideDefaultTags = useCallback(() => null, []);

    const handleChange = useCallback(
        (event: React.SyntheticEvent, values: Option[]) => {
            event.preventDefault();
            onChange(values);
        },
        [onChange],
    );

    const isOptionEqualToValue = useCallback(
        (option: Option, value: Option): boolean => {
            return option.value === value.value;
        },
        [],
    );

    const filterOptions = useCallback((options: Option[]) => {
        return options;
    }, []);

    const handleDelete = useCallback(
        (deletedSkill: Option) => () => {
            const updatedSkills = (value as Option[]).filter(
                (skill) => skill.value !== deletedSkill.value,
            );
            onChange(updatedSkills);
        },
        [value, onChange],
    );

    return (
        <FormControl>
            <FormLabel className={styles.label}>
                <Typography variant={'label'}>Hard Skills</Typography>
                <span className={styles.requiredField}>*</span>
            </FormLabel>

            <Autocomplete<Option, true>
                multiple
                className={styles.autocomplete}
                value={value as Option[]}
                renderInput={renderInput}
                options={hardSkillsOptions}
                renderTags={hideDefaultTags}
                filterOptions={filterOptions}
                popupIcon={null}
                clearIcon={null}
                isOptionEqualToValue={isOptionEqualToValue}
                onChange={handleChange}
            />

            <div className={styles.chips}>
                {(value as Option[]).map((entry) => (
                    <Chip
                        key={entry.label}
                        label={entry.label}
                        onDelete={handleDelete(entry)}
                    />
                ))}
            </div>
            {errors.hardSkills && (
                <FormHelperText className={styles.hasError}>
                    {errors.hardSkills.message}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export { SkillsAutocomplete };
