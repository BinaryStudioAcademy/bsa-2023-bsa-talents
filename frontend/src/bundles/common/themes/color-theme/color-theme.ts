import { createTheme } from '@mui/material/styles';

const colorTheme = createTheme({
    palette: {
        error: {
            main: '#FF2121',
        },
        action: {
            hover: '#0084DD',
        },
        background: {
            primary: '#F7F8FC',
            secondary: '#18A0FB',
        },
        text: {
            primary: '#90A3BF',
            secondary: '#7C8798',
        },
        input: {
            main: '#D5DCE8',
        },
        tag: {
            main: '#DCE5FF',
        },
    },
});

export { colorTheme };
