import { Button, type SxProps, type Theme } from '@mui/material';

type Properties = {
    label: string;
    variant?: 'text' | 'outlined' | 'contained';
    type?: 'submit' | 'button';
    disabled?: boolean;
    className?: string;
    sx?: SxProps<Theme>;
    endIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
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
}) => (
    <Button
        type={type}
        variant={variant}
        disabled={disabled}
        className={className}
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
        endIcon={endIcon}
        startIcon={startIcon}
    >
        {label}
    </Button>
);

export { CustomButton };
