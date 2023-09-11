import { mapToSliderMarks } from '~/bundles/common/helpers/helpers.js';
import { ExperienceYears } from '~/bundles/talent-onboarding/enums/enums.js';

const MAX_MARKS_VALUE = 100;
const MIN_MARKS_VALUE = 0;
const FIRST_INDEX = 0;
const SINGLE_UNIT_VALUE = 1;

const experienceYearsScaled = mapToSliderMarks(ExperienceYears);

const experienceYearsSliderMarks = experienceYearsScaled.map((mark) => {
    if (mark.scaledValue == MAX_MARKS_VALUE) {
        return {
            value: mark.scaledValue,
            label: mark.label + '+ years',
        };
    } else if (mark.scaledValue == MIN_MARKS_VALUE) {
        return {
            value: mark.scaledValue,
            label: 'no',
        };
    } else if (mark.value <= SINGLE_UNIT_VALUE) {
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

const sliderToRealValue = (sliderValue: number): number => {
    const experience = experienceYearsScaled.filter(
        (item) => item.scaledValue === sliderValue,
    )[FIRST_INDEX];
    return experience.value;
};
const realToSliderValue = (realValue: number): number => {
    const experience = experienceYearsScaled.filter(
        (item) => item.value === realValue,
    )[FIRST_INDEX];
    return experience.scaledValue;
};

export { experienceYearsSliderMarks, realToSliderValue, sliderToRealValue };
