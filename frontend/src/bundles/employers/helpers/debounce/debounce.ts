import { type EmployeesFiltersDto } from '../../types/employees-filters-dto.js';

function debounce<
    F extends (arguments_: EmployeesFiltersDto) => EmployeesFiltersDto,
>(
    callback: F,
    delay: number,
): (functionArguments: EmployeesFiltersDto) => void {
    let debounceTimer: NodeJS.Timeout | null = null;

    return function (
        this: ThisParameterType<F>,
        arguments_: EmployeesFiltersDto,
    ) {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(
            () => callback.call(this, arguments_),
            delay,
        );
    };
}

export { debounce };
