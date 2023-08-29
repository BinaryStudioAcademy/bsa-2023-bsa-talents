import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/bundles/common/enums/enums.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'app',
    reducers: {},
});

export { actions, name, reducer };
