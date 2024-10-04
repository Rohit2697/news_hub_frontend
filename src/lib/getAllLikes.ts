import env from "@/env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import cookie from 'cookie'
const getAllLikes = createAsyncThunk<string[]>(
  'interaction/getAllNews', async (): Promise<string[]> => {
    const { token } = cookie.parse(document.cookie)
    const response = await axios.get(env.news_hub_api + '/get-likes', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }) as AxiosResponse<{ likes: string[] }>
    return response.data.likes
  }
)

export default getAllLikes