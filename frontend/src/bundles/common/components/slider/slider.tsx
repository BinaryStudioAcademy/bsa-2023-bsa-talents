import { Box, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback } from 'react';

import { getValidClassNames } from '../../helpers/helpers.js';
import classes from './style.module.css';
import { defaultSliderStyle } from './styles.js';

type Option = {
    label?: string;
    value: number;
};

type Properties = {
    marks: Option[];
    label?: string;
    value?: number;
    className?: string;
    step?: number | null;
    valueLabelDisplay?: 'auto' | 'on' | 'off';
};

const CustomSlider: React.FC<Properties> = ({
    marks = [],
    label,
    value,
    className = classes.sliderContainerStyle,
    step = null,
    valueLabelDisplay = 'on',
}) => {
    const StyledSlider = styled(Slider)(defaultSliderStyle);

    const getValueLabel = useCallback(
        (value: number): string | null => {
            const label = marks.find((mark) => mark.value === value)?.label;
            return label ?? null;
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
