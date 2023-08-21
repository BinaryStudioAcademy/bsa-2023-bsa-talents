import { Radio as RadioMUI } from '@mui/material';
import { type SxProps, type Theme } from '@mui/material';

import { type Color } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    value: string;
    isChecked?: boolean;
    isDisabled?: boolean;
    isDisableRipple?: boolean;
    color?: ValueOf<typeof Color>;
    size?: 'small' | 'medium';
    sx?: SxProps<Theme>;
    checkedIcon?: React.ReactNode;
    icon?: React.ReactNode;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio: React.FC<Properties> = ({
    value,
    isChecked = false,
    isDisabled = false,
    isDisableRipple = false,
    color,
    size,
    sx,
    checkedIcon,
    icon,
    onChange,
}) => {
    return (
        <RadioMUI
            value={value}
            checkedIcon={checkedIcon}
            icon={icon}
            checked={isChecked}
            disabled={isDisabled}
            disableRipple={isDisableRipple}
            color={color}
            size={size}
            sx={sx}
            onChange={onChange}
        />
    );
};

export { Radio };
