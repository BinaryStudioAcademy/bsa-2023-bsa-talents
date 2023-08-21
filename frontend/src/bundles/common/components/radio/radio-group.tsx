import {
    FormControlLabel,
    RadioGroup as MuiRadioGroup,
    type SxProps,
    type Theme,
} from '@mui/material';

import { type Color } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { Radio } from './radio-item.js';

type Option = {
    value: string;
    label: string;
};

type Properties = {
    options: Option[];
    value: string;
    size?: 'small' | 'medium';
    color?: ValueOf<typeof Color>;
    sx?: SxProps<Theme>;
    checkedIcon?: React.ReactNode;
    icon?: React.ReactNode;
    row?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup: React.FC<Properties> = ({
    options,
    value,
    color,
    size,
    sx,
    checkedIcon,
    icon,
    onChange,
    row,
}) => {
    return (
        <MuiRadioGroup value={value} onChange={onChange} row={row}>
            {options.map((option) => (
                <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={
                        <Radio
                            value={option.value}
                            isChecked={value === option.value}
                            isDisabled={false}
                            color={color}
                            size={size}
                            checkedIcon={checkedIcon}
                            icon={icon}
                            onChange={onChange}
                        />
                    }
                    sx={sx}
                    label={option.label}
                />
            ))}
        </MuiRadioGroup>
    );
};

export { RadioGroup };
