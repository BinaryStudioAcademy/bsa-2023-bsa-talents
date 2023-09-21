import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    hasChangesInDetails: false,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'cabinet',
    reducers: {
        setHasChangesInDetails: (state, action) => {
            state.hasChangesInDetails = action.payload;
        },
    },
});

export { actions, name, reducer };
