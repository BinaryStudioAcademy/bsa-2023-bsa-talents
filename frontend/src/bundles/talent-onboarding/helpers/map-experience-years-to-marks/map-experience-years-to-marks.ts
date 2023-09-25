import { mapToSliderMarks } from '~/bundles/common/helpers/helpers.js';
import { ExperienceYears } from '~/bundles/talent-onboarding/enums/enums.js';

const MAX_MARKS_VALUE = 100;
const MIN_MARKS_VALUE = 0;
const FIRST_INDEX = 0;
const SINGLE_UNIT_VALUE = 18;

const markValueToOption = new Map([
    [MAX_MARKS_VALUE, { value: MAX_MARKS_VALUE, label: '5+ years' }],
    [MIN_MARKS_VALUE, { value: MIN_MARKS_VALUE, label: 'no' }],
    [SINGLE_UNIT_VALUE, { value: SINGLE_UNIT_VALUE, label: '1 year' }],
]);

const experienceYearsScaled = mapToSliderMarks(ExperienceYears);

const experienceYearsSliderMarks = experienceYearsScaled.map((mark) => {
    const option = markValueToOption.get(mark.scaledValue);
    return option ?? { value: mark.scaledValue, label: mark.label + ' years' };
});

const formatNumber = (number: number): number => {
    const INT_TO_FIXED = 1;
    const parsedNumber = Number.parseFloat('' + number);

    return Number.parseFloat(parsedNumber.toFixed(INT_TO_FIXED));
};

const sliderToRealValue = (sliderValue: number): number => {
    const experience = experienceYearsScaled.filter(
        (item) => item.scaledValue === sliderValue,
    )[FIRST_INDEX];
    return experience.value;
};
const realToSliderValue = (realValue: number): number => {
    const experience = experienceYearsScaled.filter(
        (item) => item.value === formatNumber(realValue),
    )[FIRST_INDEX];

    return experience.scaledValue;
};

export { experienceYearsSliderMarks, realToSliderValue, sliderToRealValue };
