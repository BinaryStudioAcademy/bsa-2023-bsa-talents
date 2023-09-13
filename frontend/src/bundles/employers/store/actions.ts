import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { name as sliceName } from './slice.js';

const searchCandidates = createAsyncThunk<
    EmployeesFiltersDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/search-candidates`, (filters) => {
    // Call your async backend method here if needed
    // For now, we're just returning the filters
    //console.log('api call', filters);
    return filters;
});

export { searchCandidates };
