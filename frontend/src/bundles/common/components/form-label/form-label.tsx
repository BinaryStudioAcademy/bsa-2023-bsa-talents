import { type FormLabelProps as MUIFormLabelProperties } from '@mui/material';
import { FormLabel as MUIFormLabel } from '@mui/material';

type Properties = MUIFormLabelProperties;

const FormLabel: React.FC<Properties> = ({
    children,
    className = '',
    ...props
}) => (
    <MUIFormLabel className={className} {...props}>
        {children}
    </MUIFormLabel>
);

export { FormLabel };
