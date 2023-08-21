/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {
    type TypographyPropsVariantOverrides as MuiTypographyPropertiesVariantOverrides,
    type TypographyVariants as MuiTypographyVariants,
    type TypographyVariantsOptions as MuiTypographyVariantsOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants extends MuiTypographyVariants {
        menu: React.CSSProperties;
        tub: React.CSSProperties;
        input: React.CSSProperties;
        label: React.CSSProperties;
    }

    interface TypographyVariantsOptions extends MuiTypographyVariantsOptions {
        menu?: React.CSSProperties;
        tub?: React.CSSProperties;
        input?: React.CSSProperties;
        label?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    interface TypographyPropsVariantOverrides
        extends MuiTypographyPropertiesVariantOverrides {
        menu: true;
        tub: true;
        input: true;
        label: true;
    }
}
