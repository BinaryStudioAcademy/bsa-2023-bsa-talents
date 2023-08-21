import {
    Button,
    type ButtonPropsColorOverrides,
    type SxProps,
    type Theme,
} from '@mui/material';

type Properties = {
    label: string;
    variant?: 'text' | 'outlined' | 'contained';
    type?: 'submit' | 'button';
    disabled?: boolean;
    className?: string;
    sx?: SxProps<Theme>;
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
    color?:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | ('warning' & ButtonPropsColorOverrides)
        | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomButton: React.FC<Properties> = ({
    variant = 'contained',
    label,
    type = 'button',
    disabled = false,
    className = '',
    sx = [],
    endIcon = null,
    startIcon = null,
    color,
    onClick,
}) => (
    <Button
        type={type}
        variant={variant}
        disabled={disabled}
        className={className}
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
        endIcon={endIcon}
        startIcon={startIcon}
        color={color}
        onClick={onClick}
    >
        {label}
    </Button>
);

export { CustomButton };
export { type Properties as CustomButtonProps };
