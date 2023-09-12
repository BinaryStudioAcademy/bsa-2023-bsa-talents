import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { type EmployeesFiltersDto } from '../types/employees-filters-dto.js';
import { name as sliceName } from './slice.js';

const searchCandidates = createAsyncThunk<
    EmployeesFiltersDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/search-candidates`, (payload) => {
    //TODO: send request for search to backend
    // const candidates=[] as UserDetailsGeneralCustom[];
    return payload;
});

export { searchCandidates };
