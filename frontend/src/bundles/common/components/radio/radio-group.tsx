import {
    FormControlLabel,
    RadioGroup as MuiRadioGroup,
    type RadioGroupProps,
} from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type Path,
    type PathValue,
} from 'react-hook-form';

import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { FormControl, Radio } from '../components.js';
import styles from './styles.module.scss';

type Option = {
    value: string;
    label: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: Option[];
    row?: boolean;
    hasError?: boolean;
    isDisabled?: boolean;
    className?: string;
} & RadioGroupProps;

const RadioGroup = <T extends FieldValues>({
    control,
    name,
    options,
    hasError = false,
    isDisabled = false,
    row = true,
    className = '',
}: Properties<T>): JSX.Element => {
    const radioGroupClasses = getValidClassNames(
        styles['radio-group'],
        className,
    );
    const firstElementIndex = 0;
    const firstOption = options[firstElementIndex].value;
    const { field } = useFormController({
        name,
        control,
        defaultValue: firstOption as PathValue<T, Path<T>>,
    });
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            field.onChange(event.target.value);
        },
        [field],
    );

    return (
        <FormControl
            className={styles.container}
            hasError={hasError}
            isDisabled={isDisabled}
        >
            <MuiRadioGroup {...field} className={radioGroupClasses} row={row}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                            <Radio
                                isChecked={field.value === option.value}
                                isDisabled={isDisabled}
                                onChange={handleChange}
                            />
                        }
                        label={option.label}
                    />
                ))}
            </MuiRadioGroup>
        </FormControl>
    );
};

export { RadioGroup };
