import { createSlice } from '@reduxjs/toolkit';

import { mockBadges } from '~/assets/mock-data/mock-data.js';

import { type bsaBadge } from '../types/types.js';

type State = {
    bsaBadges: bsaBadge[];
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
