const getYearsTitle = (value?: number): string => {
    const singleYear = 1;
    return value ? `${value} year${value === singleYear ? '' : 's'}` : 'no';
};

export { getYearsTitle };
