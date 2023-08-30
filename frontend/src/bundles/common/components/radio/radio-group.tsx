import { FormControlLabel, RadioGroup as MuiRadioGroup } from '@mui/material';
import { type RadioGroupProps } from '@mui/material';

import { Radio } from './radio-item.js';

type Option = {
    value: string;
    label: string;
};

type Properties = {
    options: Option[];
    defaultValue?: string;
    value?: string;
    className?: string;
    row?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & RadioGroupProps;

const RadioGroup: React.FC<Properties> = ({
    options,
    value,
    defaultValue,
    className,
    onChange,
    row,
}) => {
    return (
        <MuiRadioGroup
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            row={row}
            className={className}
        >
            {options.map((option) => (
                <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={
                        <Radio
                            value={option.value}
                            isChecked={value === option.value}
                            isDisabled={false}
                            onChange={onChange}
                        />
                    }
                    label={option.label}
                />
            ))}
        </MuiRadioGroup>
    );
};

export { RadioGroup };
