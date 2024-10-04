import axios from "axios";
import env from "@/env";
const api = axios.create({
  baseURL: env.news_hub_api
})

export default api