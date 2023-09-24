function createNumberRangeArray(
    min: number,
    max: number,
    step: number,
): number[] {
    const range = [];
    for (let index = min; index <= max + Number.EPSILON; index += step) {
        range.push(index);
    }
    return range;
}

export { createNumberRangeArray };
