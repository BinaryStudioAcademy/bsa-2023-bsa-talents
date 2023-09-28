const createNumberRangeArray = (
    min: number,
    max: number,
    step: number,
): number[] => {
    const ranges = [];
    for (let index = min; index <= max + Number.EPSILON; index += step) {
        ranges.push(index);
    }
    return ranges;
};

export { createNumberRangeArray };
