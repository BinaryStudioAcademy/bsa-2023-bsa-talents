import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'app',
    reducers: {
        resetStore: () => {
            // this is empty on purpose. Comment is just for linter
        },
    },
});

export { actions, name, reducer };
