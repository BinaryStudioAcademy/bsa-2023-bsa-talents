const getURLWithQueryString = (
    path: string,
    parameters: Record<string, string>,
): string => {
    const queryParameters = new URLSearchParams(parameters);
    return `${path}?${queryParameters.toString()}`;
};

export { getURLWithQueryString };
