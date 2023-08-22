/* eslint-disable sonarjs/no-duplicate-string */
import { createTheme } from '@mui/material/styles';

const typographyTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-family)',
        h1: {
            fontSize: 'var(--font-size-h1)',
            lineHeight: 1.19,
            fontWeight: 'var(--font-weight-bold)',
        },
        h2: {
            fontSize: 'var(--font-size-h2)',
            lineHeight: 1.35,
            fontWeight: 'var(--font-weight-medium)',
        },
        h3: {
            fontSize: 'var(--font-size-h3)',
            fontWeight: 'var(--font-weight-medium)',
        },
        h4: {
            fontSize: 'var(--font-size-h4)',
            lineHeight: 1.35,
            fontWeight: 'var(--font-weight-medium)',
        },
        h5: {
            fontSize: 'var(--font-size-h5)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-semi-bold)',
        },
        h6: {
            fontSize: 'var(--font-size-h6)',
            lineHeight: 1.6,
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-menu)',
        },
        body1: {
            fontSize: 'var(--font-size-secondary)',
            lineHeight: 1.33,
        },
        body2: {
            fontSize: 'var(--font-size-third)',
            lineHeight: 1.42,
            fontWeight: 'var(--font-weight-medium)',
        },
        buttonBig: {
            fontSize: 'var(--font-size-btn-lg)',
            lineHeight: 'var(--line-height-main)',
        },
        buttonSmall: {
            fontSize: 'var(--font-size-btn-sm)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-medium)',
        },
        caption: {
            lineHeight: 'var(--line-height-main)',
        },
        step: {
            fontWeight: 'var(--font-weight-bold)',
            letterSpacing: 'var(--letter-spacing-step)',
        },
        label: {
            fontSize: 'var( --font-size-label)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-medium)',
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
