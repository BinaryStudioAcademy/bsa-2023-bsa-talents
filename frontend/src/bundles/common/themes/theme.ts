import { createTheme } from '@mui/material/styles';

import { colorTheme } from './color-theme/color-theme.js';

const theme = createTheme({
    ...colorTheme,
});

export { theme };
