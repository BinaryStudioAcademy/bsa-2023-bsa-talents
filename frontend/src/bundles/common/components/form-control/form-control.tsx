import { type FormControlProps as MUIFormControlProperties } from '@mui/material';
import { FormControl as MUIFormControl } from '@mui/material';

import { ColorProperty, InputVariant } from '../../enums/enums.js';

type Properties = MUIFormControlProperties & {
    isError?: boolean;
    isDisabled?: boolean;
};

const FormControl: React.FC<Properties> = ({
    children,
    color = ColorProperty.PRIMARY,
    variant = InputVariant.STANDARD,
    isError = false,
    isDisabled = false,
    className = '',
}) => (
    <MUIFormControl
        color={color}
        variant={variant}
        error={isError}
        disabled={isDisabled}
        className={className}
    >
        {children}
    </MUIFormControl>
);

export { FormControl };
