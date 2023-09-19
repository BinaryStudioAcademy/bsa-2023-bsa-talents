import { formatDistanceToNow } from 'date-fns';

import { DATE_COMPONENTS, MONTH_OFFSET, UNIT_MAP } from './constants/constants';

const getElapsedTime = (startDateString: string): string => {
    const parts = startDateString.split(/[ +.:TZ-]/);
    const year = Number.parseInt(parts[DATE_COMPONENTS.YEAR], 10);
    const month =
        Number.parseInt(parts[DATE_COMPONENTS.MONTH], 10) - MONTH_OFFSET;
    const day = Number.parseInt(parts[DATE_COMPONENTS.DAY], 10);
    const hour = Number.parseInt(parts[DATE_COMPONENTS.HOUR], 10);
    const minute = Number.parseInt(parts[DATE_COMPONENTS.MINUTE], 10);
    const second = Number.parseInt(parts[DATE_COMPONENTS.SECOND], 10);

    const startDate = new Date(year, month, day, hour, minute, second);

    const distance = formatDistanceToNow(startDate, {
        addSuffix: true,
    });

    const match = distance.match(/(\d+)\s*([A-Za-z]+)/);

    if (match) {
        const [, number, unit] = match;
        const shortUnit = UNIT_MAP[unit] || unit.charAt(0);
        return `${number}${shortUnit}`;
    }

    return UNIT_MAP[distance];
};

export { getElapsedTime };
