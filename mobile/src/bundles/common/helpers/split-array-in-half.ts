const COLUMNS_NUMBER = 2;
const START_INDEX = 0;

const splitArrayInHalf = <T>(options: T[]): T[][] => {
    const halfLength = Math.ceil(options.length / COLUMNS_NUMBER);
    const column1Options = options.slice(START_INDEX, halfLength);
    const column2Options = options.slice(halfLength);

    return [column1Options, column2Options];
};

export { splitArrayInHalf };
