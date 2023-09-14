import { type EmployeesFiltersDto } from '../../types/employees-filters-dto.js';

type DebounceCallback = (
    filters: EmployeesFiltersDto,
    resolve: (result: EmployeesFiltersDto) => void,
) => void;

function debounce(
    function_: DebounceCallback,
    delay: number,
): (
    filters: EmployeesFiltersDto,
    resolve: (result: EmployeesFiltersDto) => void,
) => void {
    let debounceTimer: NodeJS.Timeout | null = null;

    return function (
        filters: EmployeesFiltersDto,
        resolve: (result: EmployeesFiltersDto) => void,
    ): void {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            function_(filters, resolve);
        }, delay);
    };
}

export { debounce };
