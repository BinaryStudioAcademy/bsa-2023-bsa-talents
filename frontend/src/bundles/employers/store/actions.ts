import { createAsyncThunk } from '@reduxjs/toolkit';

import { type AsyncThunkConfig } from '~/bundles/common/types/types.js';

import { employerDataMapper } from '../helpers/mapper/employers-data-mapper.js';
import {
    type EmployeesFiltersDto,
    type EmployerDataDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const searchCandidates = createAsyncThunk<
    EmployeesFiltersDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/search-candidates`, (filters) => {
    // TODO: call search candidates API. For now, we're just returning the filters
    //console.log('api call', filters);
    return filters;
});

const setFilters = createAsyncThunk<
    EmployeesFiltersDto,
    EmployeesFiltersDto,
    AsyncThunkConfig
>(`${sliceName}/set-filters`, (filters) => {
    return filters;
});

const getEmployerData = createAsyncThunk<
    EmployerDataDto | null,
    string,
    AsyncThunkConfig
>(`${sliceName}/get-employer-data`, async (id, { extra, rejectWithValue }) => {
    const { employersApi } = extra;

    try {
        const userDetails = await employersApi.getEmployerDetails(id);

        return employerDataMapper(userDetails);
    } catch (error) {
        rejectWithValue({
            _type: 'rejected',
            error,
        });
        return null;
    }
});

export { getEmployerData, searchCandidates, setFilters };
