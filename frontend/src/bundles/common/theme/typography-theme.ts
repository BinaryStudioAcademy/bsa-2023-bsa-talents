/* eslint-disable sonarjs/no-duplicate-string */
import { createTheme } from '@mui/material/styles';

const typographyTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-family)',
        h1: {
            fontSize: 'var(--font-size-h1)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-bold)',
        },
        h2: {
            fontSize: 'var(--font-size-h2)',
            lineHeight: 'var(--line-height-h2-h4)',
            fontWeight: 'var(--font-weight-bold)',
        },
        h3: {
            fontSize: 'var(--font-size-h3)',
            lineHeight: 'var(--line-height-h2-h4)',
            fontWeight: 'var(--font-weight-medium)',
        },
        h4: {
            fontSize: 'var(--font-size-h4)',
            lineHeight: 'var(--line-height-h2-h4)',
            fontWeight: 'var(--font-weight-medium)',
        },
        h5: {
            fontSize: 'var(--font-size-h5)',
            lineHeight: 'var(--line-height-h5-h6)',
            fontWeight: 'var(--font-weight-medium)',
        },
        h6: {
            fontSize: 'var(--font-size-h6)',
            lineHeight: 'var(--line-height-h5-h6)',
            fontWeight: 'var(--font-weight-medium)',
        },
        menu: {
            fontSize: 'var(--font-size-menu)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-regular)',
        },
        body1: {
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-regular)',
        },
        button: {
            fontSize: 'var(--font-size-btn)',
            lineHeight: 'var(--line-height-btn)',
            fontWeight: 'var(--font-weight-regular)',
        },
        caption: {
            fontSize: 'var(--font-size-caption)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-regular)',
        },
        input: {
            fontSize: 'var(--font-size-base)',
            lineHeight: 'var(--line-height-main)',
            fontWeight: 'var(--font-weight-regular)',
        },
        label: {
            fontSize: 'var(--font-size-base)',
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
