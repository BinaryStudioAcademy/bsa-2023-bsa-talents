import {
    Autocomplete,
    FormControl,
    FormHelperText,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';
import { type Control, type FieldPath } from 'react-hook-form';

// import { Chip } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';
import { type SkillsStepFormValues } from './types/skills-step-form-values.js';

type Properties = {
    control: Control<SkillsStepFormValues>;
    name: FieldPath<SkillsStepFormValues>;
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
        () => (values: Option[]) => {
            onChange(values);
        },
        [onChange],
    );

    const filterOptions = useCallback((options: Option[]) => {
        return options;
    }, []);

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
                onChange={handleChange}
            />
            {/* 
            <div>
                {value.map((entry) => (
                    <Chip label={entry.label} onDelete={() => {}} />
                ))}
            </div> */}
            {errors.hardSkills && (
                <FormHelperText className={styles.hasError}>
                    {errors.hardSkills.message}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export { SkillsAutocomplete };