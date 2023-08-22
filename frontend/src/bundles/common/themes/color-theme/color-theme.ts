import { createTheme } from '@mui/material/styles';

import { Colors } from '../../enums/colors.enum.js';

const colorTheme = createTheme({
    palette: {
        error: {
            main: Colors.ERROR_MAIN,
        },
        action: {
            hover: Colors.ACTION_HOVER,
        },
        background: {
            primary: Colors.BACKGROUND_PRIMARY,
            secondary: Colors.BACKGROUND_SECONDARY,
        },
        text: {
            primary: Colors.TEXT_PRIMARY,
            secondary: Colors.TEXT_SECONDARY,
        },
        input: {
            main: Colors.INPUT_MAIN,
        },
        tag: {
            main: Colors.TAG_MAIN,
        },
    },
});

export { colorTheme };
