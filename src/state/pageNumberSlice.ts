import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  page: 1
}

const pageNumberSlice = createSlice({
  name: "page_no",
  initialState,
  reducers: {
    updatePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    }
  }
})

export const { updatePage } = pageNumberSlice.actions
export default pageNumberSlice