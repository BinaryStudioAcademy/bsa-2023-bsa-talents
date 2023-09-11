import { Autocomplete, FormControl, TextField } from '@mui/material';
import { type SyntheticEvent } from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { Chip } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
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

const SkillsAutocomplete = <T extends FieldValues>({
    name,
    control,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

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
        (event: SyntheticEvent, values: Option[]) => {
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
        <FormControl className={styles.form}>
            <Autocomplete<Option, true>
                multiple
                className={styles.autocomplete}
                value={value || []}
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
        </FormControl>
    );
};

export { SkillsAutocomplete };
