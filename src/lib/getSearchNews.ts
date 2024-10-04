import { NewsResult } from "@/interface";

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import cookie from 'cookie'


const getSearchNews = createAsyncThunk<NewsResult, { searchTerm: string, page?: number } | undefined>('fetch_all_news/getSearchNews', async (payload): Promise<NewsResult> => {
  try {

    const { token } = cookie.parse(document.cookie)
  
    const paramObj = {
      searchTerm: payload?.searchTerm,
      page: payload?.page
    }

    const response = await api.get('/searchNews', {
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
export default getSearchNews