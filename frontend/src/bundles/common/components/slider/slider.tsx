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
    className?: string;
    step?: number | null;
    valueLabelDisplay?: 'auto' | 'on' | 'off';
    marks: Mark[];
};

const CustomSlider: React.FC<Properties> = ({
    label,
    value,
    marks = defaultExperienceMarks,
    className = classes.sliderContainerStyle,
    step = null,
    valueLabelDisplay = 'on',
}) => {
    const StyledSlider = styled(Slider)(defaultSliderStyle);

    const getValueLabel = useCallback(
        (value: number): string | null => {
            return Array.isArray(marks)
                ? (marks.find((mark) => mark.value === value)?.label as string)
                : null;
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
            {label && <span>{label}</span>}
            <StyledSlider
                aria-label={label}
                defaultValue={value}
                marks={marks}
                step={step}
                valueLabelDisplay={valueLabelDisplay}
                valueLabelFormat={getValueLabel}
            />
        </Box>
    );
};

export { type Properties as SliderProps };
export { CustomSlider as Slider };
