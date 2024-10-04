import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  search: ""
}

 const searchBoxSlice=createSlice({
  name:"search_box",
  initialState,
  reducers:{
    updateSearchBox:(state,action:PayloadAction<string>)=>{
      state.search=action.payload
    }
  }
})
export const {updateSearchBox}=searchBoxSlice.actions
export default searchBoxSlice