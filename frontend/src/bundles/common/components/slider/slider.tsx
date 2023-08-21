import { Box, Slider } from '@mui/material';
import { type SxProps } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';

import { defaultExperienceMarks } from './default-values.js';
import { defaultSliderContainerStyle, defaultSliderStyle } from './styles.js';

type Mark = {
    label?: string;
    value: number;
};

type Properties = {
    label?: string;
    value?: number;
    marks?: Mark[] | boolean | undefined;
    containerStyle?: SxProps;
};

const CustomSlider: React.FC<Properties> = ({
    label = 'slider label',
    value,
    marks = defaultExperienceMarks,
    containerStyle = defaultSliderContainerStyle,
}) => {
    const StyledSlider = styled(Slider)(defaultSliderStyle);

    const getValueLabel = useCallback(
        (value: number): string | undefined => {
            return Array.isArray(marks)
                ? (marks.find((mark) => mark.value === value)?.label as string)
                : 'undefined';
        },
        [marks],
    );

    return (
        <Box sx={{ ...defaultSliderContainerStyle, ...containerStyle }}>
            <span>{label}</span>
            <StyledSlider
                aria-label={label}
                defaultValue={value}
                marks={marks}
                step={null}
                valueLabelDisplay="auto"
                valueLabelFormat={getValueLabel}
            />
        </Box>
    );
};

export { type Properties as SliderProps };
export { CustomSlider as Slider };
