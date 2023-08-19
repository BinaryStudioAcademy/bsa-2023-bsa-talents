import { Typography as TypographyBase } from '@mui/material';

type Properties = {
    children: React.ReactNode;
    variant: 'h1' | 'h2' | 'h3'; //TODO: Add other variants depending on projects' needs
};

const Typography: React.FC<Properties> = ({ children, variant }) => {
    return <TypographyBase variant={variant}>{children}</TypographyBase>;
};

export { Typography };
