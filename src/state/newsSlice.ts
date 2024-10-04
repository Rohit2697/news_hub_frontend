import { createSlice } from "@reduxjs/toolkit";
import { NewsSlice } from "@/interface";
import getAllNews from "@/lib/getAllNews";
import getSearchNews from "@/lib/getSearchNews";
import getCategoryNews from "@/lib/getCategoryNews";
import getAllLikes from "@/lib/getAllLikes";
import getRecommendation from "@/lib/getRecommendation";

const initialState: NewsSlice = {
  status: "loading",
  result: { status: "", totalResults: 0, articles: [] },
  type: '',
  likes: []

}

const newsSlice = createSlice({
  name: 'fetch_all_news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNews.pending, (state) => {
      state.status = "loading"
    }).addCase(getAllNews.fulfilled, (state, action) => {
      state.status = "success"
      state.result = action.payload
      state.type = 'all'
    }).addCase(getAllNews.rejected, (state) => {
      state.status = "error"
    }).addCase(getSearchNews.pending, (state) => {
      state.status = "loading"

    }).addCase(getSearchNews.fulfilled, (state, action) => {
      state.status = "success"
      state.result = action.payload
      state.type = 'search'
    }).addCase(getSearchNews.rejected, (state) => {
      state.status = "error"
    }).addCase(getCategoryNews.pending, (state) => {
      state.status = "loading"
    }).addCase(getCategoryNews.fulfilled, (state, action) => {
      state.status = "success"
      state.result = action.payload
      state.type = "category"
    }).addCase(getCategoryNews.rejected, (state) => {
      state.status = "error"
    }).addCase(getAllLikes.pending, (state) => {
      state.status = "loading"
    }).addCase(getAllLikes.fulfilled, (state, action) => {
      state.status = "success"
      state.likes = action.payload
    }).addCase(getAllLikes.rejected, (state) => {
      state.status = "error"
    }).addCase(getRecommendation.pending, (state) => {
      state.status = "loading"
    }).addCase(getRecommendation.fulfilled, (state, action) => {
      state.status = "success"
      state.result = action.payload
      state.type = 'recommendation'
    }).addCase(getRecommendation.rejected, (state) => {
      state.status = "error"
    })
  }
})

export default newsSlice