import { getDateEnding } from '../helpers';

const convertInputToDate = (value: number): string => {
    const monthInYear = 12;
    const yearRounder = 10;
    const dateTitle = value < monthInYear ? 'month' : 'year';
    const dateValue =
        value < monthInYear
            ? value
            : Math.round((value / monthInYear) * yearRounder) / yearRounder;
    const refactoredDateTitle = getDateEnding(dateTitle, dateValue);
    return `${dateValue} ${refactoredDateTitle}`;
};

export { convertInputToDate };
