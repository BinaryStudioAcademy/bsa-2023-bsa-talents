const getDateEnding = (dateTitle: string, value: number): string => {
    const pluralNumber = 2;
    return value < pluralNumber ? dateTitle : dateTitle + 's';
};

export { getDateEnding };
