type DebounceCallback<T> = (filters: T, resolve: (result: T) => void) => void;

const debounce = <T>(
    function_: DebounceCallback<T>,
    delay: number,
): ((filters: T, resolve: (result: T) => void) => void) => {
    let debounceTimer: NodeJS.Timeout | null = null;

    return (filters: T, resolve: (result: T) => void): void => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            function_(filters, resolve);
        }, delay);
    };
};

export { debounce };
