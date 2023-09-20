import {
    formatDistanceToNow,
    parseISO,
} from '~/bundles/common/helpers/helpers';

import { UNIT_MAP } from './constants/constants';

const getElapsedTime = (startDateString: string): string => {
    const startDate = parseISO(startDateString);

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
