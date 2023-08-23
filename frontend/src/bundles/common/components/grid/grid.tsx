import {
    Grid as MUIGrid,
    type GridProps as MUIGridProperties,
} from '@mui/material';

type Properties = MUIGridProperties;

const Grid: React.FC<Properties> = ({
    children,
    className = '',
    component = 'div',
    ...props
}) => (
    <MUIGrid className={className} component={component} {...props}>
        {children}
    </MUIGrid>
);

export { Grid };
