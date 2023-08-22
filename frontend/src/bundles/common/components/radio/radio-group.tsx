import { FormControlLabel, RadioGroup as MuiRadioGroup } from '@mui/material';

import { Radio } from './radio-item.js';

type Option = {
    value: string;
    label: string;
};

type Properties = {
    options: Option[];
    value: string;
    className?: string;
    row?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup: React.FC<Properties> = ({
    options,
    value,
    className,
    onChange,
    row,
}) => {
    return (
        <MuiRadioGroup
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
