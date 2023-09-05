const EMPTY_OBJECT_LENGTH = 0;
const STEP = 1;
const MAX_MARKS_VALUE = 100;

function mapToSliderMarks<T extends Record<string, number>>(
    enumObject: T,
): { scaledValue: number; value: number; label: string }[] {
    const elements = Object.values(enumObject).sort();
    const elementsLength = elements.length;
    if (elementsLength === EMPTY_OBJECT_LENGTH) {
        return [];
    }
    const stepSize = MAX_MARKS_VALUE / (elementsLength - STEP);
    return elements.map((item, index) => ({
        scaledValue: Math.round(index * stepSize),
        value: item,
        label: String(item),
    }));
}

export { mapToSliderMarks };
