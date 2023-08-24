import { createTheme } from '@mui/material/styles';

import { colorTheme } from './color-theme/color-theme.js';
import { typographyTheme } from './typography-theme/typography-theme.js';

const theme = createTheme({
    ...colorTheme,
    ...typographyTheme,
});

export { theme };
