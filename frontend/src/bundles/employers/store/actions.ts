import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { debounce } from '../helpers/helpers.js';
import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { name as sliceName } from './slice.js';

const SEND_DELAY = 2000;
const fetchCandidates = (filters: EmployeesFiltersDto): EmployeesFiltersDto => {
    // TODO: add API call logic here...
    // console.log('api call', filters);
    return filters;
};

const debouncedFetch = debounce(fetchCandidates, SEND_DELAY);

const searchCandidates = createAsyncThunk<
    EmployeesFiltersDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/search-candidates`, (filters) => {
    debouncedFetch(filters);
    return filters;
});

export { searchCandidates };
