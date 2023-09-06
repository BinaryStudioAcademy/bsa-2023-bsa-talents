import { Button as MUIButton } from '@mui/material';

import { type ColorProperty } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type Properties = {
    component?: string;
    label: string;
    variant?: 'text' | 'outlined' | 'contained';
    type?: 'submit' | 'button';
    disabled?: boolean;
    className?: string;
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
    color?: ValueOf<typeof ColorProperty>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<Properties> = ({
    variant = 'contained',
    label,
    type = 'button',
    disabled = false,
    className = '',
    endIcon = null,
    startIcon = null,
    color,
    onClick,
}) => (
    <MUIButton
        type={type}
        variant={variant}
        disabled={disabled}
        className={className}
        endIcon={endIcon}
        startIcon={startIcon}
        color={color}
        onClick={onClick}
    >
        {label}
    </MUIButton>
);

export { type Properties as ButtonProperties };
export { Button };
