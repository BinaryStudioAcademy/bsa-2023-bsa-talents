import {
    Grid as MUIGrid,
    type GridProps as MUIGridProperties,
} from '@mui/material';

type Properties = MUIGridProperties;

const Grid: React.FC<Properties> = ({
    children,
    className = '',
    component = 'div',
    ...properties
}) => (
    <MUIGrid className={className} component={component} {...properties}>
        {children}
    </MUIGrid>
);

export { Grid };
