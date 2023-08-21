import { type SxProps, type Theme } from '@mui/material';
import { FormControl as MUIFormControl } from '@mui/material';

const InputVariantTypes = {
    FILLED: 'filled',
    OUTLINED: 'outlined',
    STANDART: 'standard',
} as const;

type FormControlVariants =
    (typeof InputVariantTypes)[keyof typeof InputVariantTypes];

type Properties = {
    children: React.ReactNode;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; // TODO: change after the color scheme is merged
    variant?: FormControlVariants;
    isError?: boolean;
    isDisabled?: boolean;

    className?: string;
    sx?: SxProps<Theme>;
};

const FormControl: React.FC<Properties> = ({
    children,
    color = 'primary',

    variant = 'standard',
    isError = false,
    isDisabled = false,
    className = '',
    sx = [],
}) => (
    <MUIFormControl
        color={color}
        variant={variant}
        error={isError}
        disabled={isDisabled}
        className={className}
        sx={sx}
    >
        {children}
    </MUIFormControl>
);

export { FormControl };
