/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

import {
    type TypographyPropsVariantOverrides as MuiTypographyPropertiesVariantOverrides,
    type TypographyVariants as MuiTypographyVariants,
    type TypographyVariantsOptions as MuiTypographyVariantsOptions,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants extends MuiTypographyVariants {
        step: React.CSSProperties;
        label: React.CSSProperties;
        buttonBig: React.CSSProperties;
        buttonSmall: React.CSSProperties;
    }

    interface TypographyVariantsOptions extends MuiTypographyVariantsOptions {
        step: React.CSSProperties;
        label: React.CSSProperties;
        buttonBig: React.CSSProperties;
        buttonSmall: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides
        extends MuiTypographyPropertiesVariantOverrides {
        step: true;
        label: true;
        buttonBig: true;
        buttonSmall: true;
    }
}
