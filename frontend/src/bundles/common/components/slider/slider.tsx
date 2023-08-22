import { Box, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';

import { getValidClassNames } from '../../helpers/helpers.js';
import { defaultExperienceMarks } from './default-values.js';
import classes from './style.module.css';
import { defaultSliderStyle } from './styles.js';

type Mark = {
    label?: string;
    value: number;
};

type Properties = {
    label?: string;
    value?: number;
    marks?: Mark[] | boolean | undefined;
    className?: string;
};

const CustomSlider: React.FC<Properties> = ({
    label = 'slider label',
    value,
    marks = defaultExperienceMarks,
    className = classes.sliderContainerStyle,
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
        <Box
            className={getValidClassNames(
                className,
                classes.sliderContainerStyle,
            )}
        >
            <span>{label}</span>
            <StyledSlider
                aria-label={label}
                defaultValue={value}
                marks={marks}
                step={null}
                valueLabelDisplay="on"
                valueLabelFormat={getValueLabel}
            />
        </Box>
    );
};

export { type Properties as SliderProps };
export { CustomSlider as Slider };
