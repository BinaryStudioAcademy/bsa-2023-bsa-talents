import { FormLabel as MUIFormLabel } from '@mui/material';

type Properties = {
    children: React.ReactNode;
    className?: string;
};

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
