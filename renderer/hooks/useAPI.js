import useSWR from "swr";
import { fetchApiResult } from "../helper";

export function useAPI(key, config) {
  return useSWR(key, fetchApiResult, config);
}
