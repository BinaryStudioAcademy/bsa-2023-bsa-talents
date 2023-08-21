import { type SxProps, type Theme } from '@mui/material';
import { FormLabel as MUIFormLabel } from '@mui/material';

type Properties = {
    children: React.ReactNode;

    className?: string;
    sx?: SxProps<Theme>;
};

const FormLabel: React.FC<Properties> = ({
    children,
    className = '',
    sx = [],
    ...properties
}) => (
    <MUIFormLabel className={className} sx={sx} {...properties}>
        {children}
    </MUIFormLabel>
);

export { FormLabel };
