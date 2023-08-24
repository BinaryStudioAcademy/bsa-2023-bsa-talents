import { createTheme } from '@mui/material/styles';

import { Typography } from '../../enums/enums.js';

const typographyTheme = createTheme({
    typography: {
        fontFamily: Typography.FONT_FAMILY,
        h1: {
            fontSize: Typography.FONT_SIZE_H1,
            lineHeight: Typography.LINE_HEIGHT_MAIN,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
        },
        h2: {
            fontSize: Typography.FONT_SIZE_H2,
            lineHeight: Typography.LINE_HEIGHT_H2_H4,
            fontWeight: Typography.FONT_WEIGHT_BOLD,
        },
        h3: {
            fontSize: Typography.FONT_SIZE_H3,
            lineHeight: Typography.LINE_HEIGHT_H2_H4,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM,
        },
        h4: {
            fontSize: Typography.FONT_SIZE_H4,
            lineHeight: Typography.LINE_HEIGHT_H2_H4,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM,
        },
        h5: {
            fontSize: Typography.FONT_SIZE_H5,
            lineHeight: Typography.LINE_HEIGHT_H5_H6,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM,
        },
        h6: {
            fontSize: Typography.FONT_SIZE_H6,
            lineHeight: Typography.LINE_HEIGHT_H5_H6,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM,
        },
        menu: {
            fontSize: Typography.FONT_SIZE_MENU,
            lineHeight: Typography.LINE_HEIGHT_MAIN,
            fontWeight: Typography.FONT_WEIGHT_REGULAR,
        },
        body1: {
            fontSize: Typography.FONT_SIZE_BODY,
            lineHeight: Typography.LINE_HEIGHT_MAIN,
            fontWeight: Typography.FONT_WEIGHT_REGULAR,
        },
        button: {
            fontSize: Typography.FONT_SIZE_BUTTON,
            lineHeight: Typography.LINE_HEIGHT_BUTTON,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM,
        },
        caption: {
            fontSize: Typography.FONT_SIZE_CAPTION,
            lineHeight: Typography.LINE_HEIGHT_MAIN,
            fontWeight: Typography.FONT_WEIGHT_REGULAR,
        },
        input: {
            fontSize: Typography.FONT_SIZE_BASE,
            lineHeight: Typography.LINE_HEIGHT_MAIN,
            fontWeight: Typography.FONT_WEIGHT_REGULAR,
        },
        label: {
            fontSize: Typography.FONT_SIZE_BASE,
            lineHeight: Typography.LINE_HEIGHT_MAIN,
            fontWeight: Typography.FONT_WEIGHT_MEDIUM,
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    caption: 'p',
                },
            },
        },
    },
});

export { typographyTheme };
