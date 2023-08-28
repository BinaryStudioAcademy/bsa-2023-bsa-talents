const padNumberWithZero = <T extends number | string>(
    number: T,
    width: number,
): string => {
    return String(number).padStart(width, '0');
};

export { padNumberWithZero };
