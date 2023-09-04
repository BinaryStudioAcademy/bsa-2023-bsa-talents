function createNumberRangeArray(
    min: number,
    max: number,
    step: number,
): number[] {
    const rangeArray = [];
    for (let index = min; index <= max + Number.EPSILON; index += step) {
        rangeArray.push(index);
    }
    return rangeArray;
}

export { createNumberRangeArray };
