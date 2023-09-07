import { type FormControlProps as MUIFormControlProperties } from '@mui/material';
import { FormControl as MUIFormControl } from '@mui/material';

import { ColorProperty, InputVariant } from '~/bundles/common/enums/enums.js';

type Properties = MUIFormControlProperties & {
    hasError?: boolean;
    isDisabled?: boolean;
};

const FormControl: React.FC<Properties> = ({
    children,
    color = ColorProperty.PRIMARY,
    variant = InputVariant.STANDARD,
    hasError = false,
    isDisabled = false,
    className = '',
    ...props
}) => (
    <MUIFormControl
        {...props}
        color={color}
        variant={variant}
        error={hasError}
        disabled={isDisabled}
        className={className}
    >
        {children}
    </MUIFormControl>
);

export { FormControl };
