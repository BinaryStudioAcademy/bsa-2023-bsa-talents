import { mapToSliderMarks } from '~/bundles/common/helpers/helpers.js';
import { experienceYears } from '~/bundles/talent-onboarding/enums/enums.js';

const MAX_MARKS_VALUE = 100;
const MIN_MARKS_VALUE = 0;
const DEFAULT_EXPERIENCE = 0;
const SINGLE_UNIT_VALUE = 1;

const experienceYearsScaled = mapToSliderMarks(experienceYears);

const experienceYearsSliderMarks = experienceYearsScaled.map((mark) => {
    if (mark.scaledValue == MAX_MARKS_VALUE) {
        return {
            value: mark.scaledValue,
            label: '5+ years',
        };
    } else if (mark.scaledValue == MIN_MARKS_VALUE) {
        return {
            value: mark.scaledValue,
            label: 'no',
        };
    } else if (mark.value === SINGLE_UNIT_VALUE) {
        return {
            value: mark.scaledValue,
            label: mark.label + ' year',
        };
    }
    return {
        value: mark.scaledValue,
        label: mark.label + ' years',
    };
});

const roundNumber = (number: number): number => {
    const INT_TO_FIXED = 1;
    const parsedNumber = Number.parseFloat('' + number);

    return Number.parseFloat(parsedNumber.toFixed(INT_TO_FIXED));
};

const sliderToRealValue = (sliderValue: number): number => {
    const experience = experienceYearsScaled.find(
        (item) => item.scaledValue === sliderValue,
    );
    if (experience) {
        return experience.value;
    }
    return DEFAULT_EXPERIENCE;
};

const realToSliderValue = (realValue: number): number => {
    const experience = experienceYearsScaled.find(
        (item) => item.value === roundNumber(realValue),
    );

    if (experience) {
        return experience.scaledValue;
    }
    return DEFAULT_EXPERIENCE;
};

export { experienceYearsSliderMarks, realToSliderValue, sliderToRealValue };
