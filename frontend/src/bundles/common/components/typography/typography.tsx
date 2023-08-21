import { Typography as TypographyBase } from '@mui/material';

type Properties = {
    children: React.ReactNode;
    variant:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'menu'
        | 'body1'
        | 'tub'
        | 'button'
        | 'caption'
        | 'input'
        | 'label';
};

const Typography: React.FC<Properties> = ({ children, variant }) => {
    return <TypographyBase variant={variant}>{children}</TypographyBase>;
};

export { Typography };
