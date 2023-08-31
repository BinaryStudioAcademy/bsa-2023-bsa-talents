import { ExperienceYears } from '~/bundles/sign-up/enums/enums.js';

const EMPTY_OBJECT_LENGTH = 0;
const INDEX = 1;
const MAX_MARKS_VALUE = 100;
function mapToSliderMarks(
    enumObject: typeof ExperienceYears,
): { scaledValue: number; value: number; label: string }[] {
    const elements = Object.values(enumObject).sort();
    const elementsLength = elements.length;
    if (elementsLength === EMPTY_OBJECT_LENGTH) {
        return [];
    }
    const stepSize = MAX_MARKS_VALUE / (elementsLength - INDEX);
    return elements.map((item, index) => ({
        label: String(item),
        scaledValue: Math.round(index * stepSize),
        value: item,
    }));
}
const experienceYearsScaled = mapToSliderMarks(ExperienceYears);

const sliderMarks = experienceYearsScaled.map((mark) => {
    if (mark.scaledValue == MAX_MARKS_VALUE) {
        return {
            value: mark.scaledValue,
            label: mark.label + '+ years',
        };
    }
    return {
        value: mark.scaledValue,
        label: mark.label + ' years',
    };
});

export { experienceYearsScaled, sliderMarks };
