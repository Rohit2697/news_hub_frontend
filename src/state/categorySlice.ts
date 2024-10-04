import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  category: ""
}

const categorySlice = createSlice({
  name: "category_state",
  initialState,
  reducers: {
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    }
  }
})

export const { updateCategory } = categorySlice.actions
export default categorySlice