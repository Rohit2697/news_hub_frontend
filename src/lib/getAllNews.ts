import { NewsResult } from "@/interface";

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import cookie from 'cookie'


const getAllNews = createAsyncThunk<NewsResult, { page?: number } | undefined>('fetch_all_news/getAllNews', async (payload): Promise<NewsResult> => {
  try {

    const { token } = cookie.parse(document.cookie)

    const paramObj = {
      page: payload?.page
    }
    
    const response = await api.get('/allNews', {
      params: paramObj,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    const data = response.data as NewsResult
    if (!data.totalResults) throw new Error("No Data Found")

    return response.data as NewsResult
  } catch (err) {
    console.log(err)
    throw err

  }
})
export default getAllNews