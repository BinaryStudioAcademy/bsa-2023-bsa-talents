const defaultSliderStyle = {
    height: 15,
    marginTop: '20px',
    '& .MuiSlider-markLabel': {
        transform: 'translateX(0%)',
        '&:nth-of-type(n + 5)': {
            display: 'none',
        },
    },
    '& .MuiSlider-track': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    '& .MuiSlider-thumb': {
        width: '1px',
        height: '15px',
        backgroundColor: '#000',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            top: '-5px',
            width: '0px',
            height: '0px',
            borderStyle: 'solid',
            borderWidth: '5px 5px 0 5px',
            borderColor: '#000000 transparent transparent transparent',
            transform: 'rotate(0deg)',
        },
    },
    '& .MuiSlider-valueLabel': {
        padding: 0,
        top: '-5px',
        backgroundColor: '#fff',
        color: 'initial',
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-mark': {
        opacity: 0,
    },
};

const defaultSliderContainerStyle = {
    width: 300,
    margin: '10px',
};

export { defaultSliderContainerStyle, defaultSliderStyle };
