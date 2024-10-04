import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { NewsStore, RootNewsState, NewsDispatch } from "../store";

export const useNewsDispatch: () => NewsDispatch = useDispatch
export const useNewsSelector: TypedUseSelectorHook<RootNewsState> = useSelector
export const useNewsStore: () => NewsStore = useStore
