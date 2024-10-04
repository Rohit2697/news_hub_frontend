import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  context: 'all',
};

const contextSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    updateContext: (state, action: PayloadAction<string>) => {
      state.context = action.payload;
    },
  },
});

export const { updateContext } = contextSlice.actions;
export default contextSlice;
