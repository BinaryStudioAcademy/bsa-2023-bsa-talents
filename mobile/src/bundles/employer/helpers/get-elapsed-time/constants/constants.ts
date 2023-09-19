const DATE_COMPONENTS = {
    YEAR: 0,
    MONTH: 1,
    DAY: 2,
    HOUR: 3,
    MINUTE: 4,
    SECOND: 5,
};

const MONTH_OFFSET = 1;

const UNIT_MAP: Record<string, string> = {
    'less than a minute ago': 'now',
    'month': 'mon',
    'months': 'mon',
};

export { DATE_COMPONENTS, MONTH_OFFSET, UNIT_MAP };
