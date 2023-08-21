import { createTheme } from '@mui/material/styles';

const typographyTheme = createTheme({
    typography: {
        fontFamily: ['"Inter"', 'sans-serif'].join(','),
        h1: {
            fontSize: 42,
            lineHeight: 1.21,
            fontWeight: 700,
        },
        h2: {
            fontSize: 28,
            lineHeight: 1.3,
            fontWeight: 700,
        },
        h4: {
            fontSize: 24,
            lineHeight: 1.35,
            fontWeight: 500,
        },
        h5: {
            fontSize: 18,
            lineHeight: 1.42,
            fontWeight: 500,
        },
        h6: {
            fontSize: 16,
            lineHeight: 1.41,
        },
        subtitle1: {
            fontSize: 18,
            lineHeight: 1.21,
            fontWeight: 400,
        },
        body1: {
            fontSize: 14,
            lineHeight: 1.21,
            fontWeight: 400,
        },
        body2: {
            fontSize: 16,
            lineHeight: 1.17,
        },
        button: {
            fontSize: 16,
            lineHeight: 1.17,
        },
    },
});

export { typographyTheme };
