/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {
    type Palette as MuiPalette,
    type PaletteOptions as MuiPaletteOptions,
    type TypeBackground as MuiTypeBackground,
} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypeBackground extends MuiTypeBackground {
        primary: string;
        secondary: string;
    }

    interface Palette extends MuiPalette {
        input: {
            main: string;
        };
        tag: {
            main: string;
        };
    }

    interface PaletteOptions extends MuiPaletteOptions {
        input: {
            main: string;
        };
        tag: {
            main: string;
        };
    }
}
