import { createSlice } from '@reduxjs/toolkit';

import { mockBadges } from '~/assets/mock-data/mock-data.js';

import { type BSABadge } from '../types/types.js';

type State = {
    bsaBadges: BSABadge[];
};

const initialState: State = {
    bsaBadges: mockBadges,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'lms',
    reducers: {},
});

export { actions, name, reducer };
