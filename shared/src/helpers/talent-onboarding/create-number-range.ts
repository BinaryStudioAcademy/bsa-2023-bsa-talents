const createNumberRangeArray = (
    min: number,
    max: number,
    step: number,
): number[] => {
    const numbers = [];
    for (let index = min; index <= max + Number.EPSILON; index += step) {
        numbers.push(index);
    }
    return numbers;
};

export { createNumberRangeArray };
