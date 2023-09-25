import { mapToSliderMarks } from '~/bundles/common/helpers/helpers.js';
import { experienceYears } from '~/bundles/talent-onboarding/enums/enums.js';

const MAX_MARKS_VALUE = 100;
const MIN_MARKS_VALUE = 0;
const DEFAULT_EXPERIENCE = 0;
const SINGLE_UNIT_VALUE = 18;

const markValueToOption = new Map([
    [MAX_MARKS_VALUE, { value: MAX_MARKS_VALUE, label: '5+ years' }],
    [MIN_MARKS_VALUE, { value: MIN_MARKS_VALUE, label: 'no' }],
    [SINGLE_UNIT_VALUE, { value: SINGLE_UNIT_VALUE, label: '1 year' }],
]);

const experienceYearsScaled = mapToSliderMarks(experienceYears);

const experienceYearsSliderMarks = experienceYearsScaled.map((mark) => {
    const option = markValueToOption.get(mark.scaledValue);
    return option ?? { value: mark.scaledValue, label: mark.label + ' years' };
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
