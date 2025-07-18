"use client";

import api from "@/lib/api";
import useSWR from "swr";

interface FetcherOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, any>;
  data?: any;
}

export const useSwrFetcher = (
  url: string,
  { method = "GET", params = {}, data = {} }: FetcherOptions = {}
): {
  data: any;
  error: any;
  isLoading: boolean;
  mutate: () => Promise<any>;
} => {
  const {
    data: responseData,
    error,
    isLoading,
    mutate,
  } = useSWR(
    url + JSON.stringify(params) + method, // key includes method & params to revalidate properly
    async () => {
      const response = await api.request({
        url,
        method,
        params: method === "GET" ? params : undefined,
        data: method !== "GET" ? data : undefined,
      });
      return response.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      dedupingInterval: 100000000,
    }
  );

  return {
    data: responseData,
    error,
    isLoading,
    mutate,
  };
};
