import { Typography } from '@mui/material';

type Properties = {
    children: React.ReactNode;
    variant: 'h1' | 'h2' | 'h3'; //TODO: Add other variants depending on projects' needs
};

const CustomTypography: React.FC<Properties> = ({ children, variant }) => {
    return <Typography variant={variant}>{children}</Typography>;
};

export { CustomTypography };
