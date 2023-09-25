import {
    Box as MUIBox,
    Slider as MUISlider,
    type SliderProps,
} from '@mui/material';

import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Option = {
    label?: string;
    value: number;
};

type Properties = SliderProps & {
    marks: Option[];
    label?: string;
    value?: number;
    containerClass?: string;
    sliderClass?: string;
    step?: number | null;
    valueLabelDisplay?: 'auto' | 'on' | 'off';
};

const CustomSlider: React.FC<Properties> = ({
    marks = [],
    label,
    step = null,
    valueLabelDisplay = 'on',
    ...props
}) => {
    const getValueLabel = useCallback(
        (value: number): string | null => {
            const mark = marks.find((mark) => mark.value === value);
            return mark ? String(mark.label) : null;
        },
        [marks],
    );

    return (
        <MUIBox className={styles.sliderContainer}>
            {label && <span>{label}</span>}
            <MUISlider
                {...props}
                className={styles.slider}
                classes={styles}
                aria-label={label}
                marks={marks}
                step={step}
                valueLabelDisplay={valueLabelDisplay}
                valueLabelFormat={getValueLabel}
            />
        </MUIBox>
    );
};

export { type Properties as SliderProps };
export { CustomSlider as Slider };
