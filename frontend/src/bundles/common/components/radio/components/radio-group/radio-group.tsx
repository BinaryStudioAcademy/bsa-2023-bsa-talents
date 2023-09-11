import {
    RadioGroup as MuiRadioGroup,
    type RadioGroupProps,
} from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import {
    FormControlLabel,
    Radio,
} from '~/bundles/common/components/components.js';
import { useFormController } from '~/bundles/common/hooks/hooks.js';

type Option = {
    value: string;
    label: string;
};

type Properties<T extends FieldValues> = RadioGroupProps & {
    control?: Control<T, null>;
    name: FieldPath<T>;
    options?: Option[];
    className?: string;
};

const RadioGroup = <T extends FieldValues>({
    control,
    name,
    options,
    className = '',
    ...props
}: Properties<T>): JSX.Element => {
    const radioGroupClasses = className;
    const { field } = useFormController({
        control,
        name,
    });

    return (
        <MuiRadioGroup {...field} className={radioGroupClasses} {...props}>
            {options?.map((option) => (
                <FormControlLabel
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    control={
                        <Radio
                            value={option.value}
                            checked={field.value === option.value}
                        />
                    }
                />
            ))}
        </MuiRadioGroup>
    );
};

export { RadioGroup };
