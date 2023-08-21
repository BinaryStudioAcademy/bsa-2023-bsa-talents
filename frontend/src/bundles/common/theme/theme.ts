import { createTheme } from '@mui/material/styles';

import { typographyTheme } from './typography-theme.js';

const theme = createTheme({
    ...typographyTheme,
});

export { theme };
