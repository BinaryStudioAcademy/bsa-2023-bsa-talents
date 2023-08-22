import { Grid as MUIGrid, type GridProps } from '@mui/material';

const Grid: React.FC<GridProps> = ({
    children,
    classes,
    columnSpacing,
    columns,
    container,
    direction,
    item,
    lg,
    md,
    rowSpacing,
    sm,
    spacing,
    sx,
    wrap,
    xl,
    xs,
    zeroMinWidth,
    component = 'div',
}) => (
    <MUIGrid
        classes={classes}
        columns={columns}
        columnSpacing={columnSpacing}
        component={component}
        container={container}
        direction={direction}
        item={item}
        lg={lg}
        md={md}
        rowSpacing={rowSpacing}
        sm={sm}
        spacing={spacing}
        sx={sx}
        wrap={wrap}
        xl={xl}
        xs={xs}
        zeroMinWidth={zeroMinWidth}
    >
        {children}
    </MUIGrid>
);

export { Grid };
