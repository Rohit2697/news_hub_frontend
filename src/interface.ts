import { Dispatch, SetStateAction } from "react"
export interface SideBarProps {
  setOpenSideBar: Dispatch<SetStateAction<boolean>>
}

export interface NewsResult {
  status: string
  totalResults: number
  articles: NewsArticle[]
}
export interface NewsArticle {
  source: {
    id: string
    name: string

  },
  _id:string,
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string

}

export interface NewsCardProps {
  newsArticle: NewsArticle,
  newsId:string,
  
}


export interface NewsSlice {
  status: "loading" | "error" | "success",
  result: NewsResult,
  type:string
  likes:string[]
}

export interface LikeButtonProps{
 
  newsId:string
}