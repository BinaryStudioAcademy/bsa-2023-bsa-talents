import { Typography as TypographyBase } from '@mui/material';

import { type ColorProperty } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

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
        | 'button'
        | 'caption'
        | 'input'
        | 'label';
    align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
    color?: ValueOf<typeof ColorProperty>;
    className?: string;
};

const Typography: React.FC<Properties> = ({
    children,
    variant,
    className,
    ...restProperties
}) => {
    return (
        <TypographyBase
            variant={variant}
            className={className}
            {...restProperties}
        >
            {children}
        </TypographyBase>
    );
};

export { Typography };
