import { configureStore } from "@reduxjs/toolkit";
// import allNewsSlice from "./allNewsSlice";
import searchBoxSlice from "./searchBoxSlice";
import categorySlice from "./categorySlice";
import pageNumberSlice from "./pageNumberSlice";
import newsSlice from "./newsSlice";
import contextSlice from "./contextSlice";
export const makeNewsStore = () => {
  return configureStore({
    reducer: {
      news: newsSlice.reducer,
      // allNews: allNewsSlice.reducer,
      context:contextSlice.reducer,
      searchBox: searchBoxSlice.reducer,
      category: categorySlice.reducer,
      page: pageNumberSlice.reducer
    }
  })
}

export type NewsStore = ReturnType<typeof makeNewsStore>
export type RootNewsState = ReturnType<NewsStore['getState']>
export type NewsDispatch = NewsStore['dispatch']