import { type FormHelperTextProps as MUIFormHelperTextProperties } from '@mui/material';
import { FormHelperText as MUIFormHelperText } from '@mui/material';

type Properties = MUIFormHelperTextProperties;

const FormHelperText: React.FC<Properties> = ({
    children,
    className = '',
    ...props
}) => (
    <MUIFormHelperText className={className} {...props}>
        {children}
    </MUIFormHelperText>
);

export { FormHelperText };
