import { type TooltipProps as MUITooltipProperties } from '@mui/material';
import { Tooltip as MUITooltip } from '@mui/material';

type Properties = MUITooltipProperties;

const Tooltip: React.FC<Properties> = ({
    children,
    className = '',
    ...props
}) => (
    <MUITooltip className={className} {...props}>
        {children}
    </MUITooltip>
);

export { Tooltip };
