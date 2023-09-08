const SINGLE_YEAR = 1;

const getYearsTitle = (value?: number): string => {
    if (!value) {
        return 'no';
    }

    return `${value} year${value === SINGLE_YEAR ? '' : 's'}`;
};

export { getYearsTitle };
