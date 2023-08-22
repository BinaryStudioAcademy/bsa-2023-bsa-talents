import { type FormLabelProps as MUIFormLabelProperties } from '@mui/material';
import { FormLabel as MUIFormLabel } from '@mui/material';

type Properties = MUIFormLabelProperties;

const FormLabel: React.FC<Properties> = ({
    children,
    className = '',
    ...properties
}) => (
    <MUIFormLabel className={className} {...properties}>
        {children}
    </MUIFormLabel>
);

export { FormLabel };
