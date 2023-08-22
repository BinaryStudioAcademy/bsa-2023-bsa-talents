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
        | 'body1'
        | 'body2'
        | 'buttonBig'
        | 'buttonSmall'
        | 'caption'
        | 'step';
    align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
    color?:
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning'
        | string;
};

const Typography: React.FC<Properties> = ({
    children,
    variant,
    ...restProperties
}) => {
    return (
        <TypographyBase variant={variant} {...restProperties}>
            {children}
        </TypographyBase>
    );
};

export { Typography };
