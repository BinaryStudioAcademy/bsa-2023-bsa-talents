import { createTheme } from '@mui/material/styles';

const typographyTheme = createTheme({
    typography: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        h1: {
            fontSize: 32,
            lineHeight: 1.19,
            fontWeight: 700,
        },
        h2: {
            fontSize: 32,
            lineHeight: 1.35,
            fontWeight: 500,
        },
        h3: {
            fontSize: 24,
            fontWeight: 500,
        },
        h4: {
            fontSize: 24,
            lineHeight: 1.35,
            fontWeight: 500,
        },
        h5: {
            fontSize: 22,
            lineHeight: 1.21,
            fontWeight: 600,
        },
        h6: {
            fontSize: 18,
            lineHeight: 1.42,
            fontWeight: 500,
        },
        menu: {
            fontSize: 20,
            lineHeight: 1.6,
            fontWeight: 500,
            letterSpacing: 0.15,
        },
        body1: {
            fontSize: 14,
            lineHeight: 1.33,
        },
        buttonBig: {
            fontSize: 15,
            lineHeight: 1.21,
        },
        buttonSmall: {
            fontSize: 13,
            lineHeight: 1.21,
            fontWeight: 500,
        },
        caption: {
            lineHeight: 1.21,
        },
        step: {
            fontWeight: 700,
            letterSpacing: 1.5,
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    menu: 'h4',
                    caption: 'p',
                    h6: 'p',
                },
            },
        },
    },
});

export { typographyTheme };
