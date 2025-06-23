import { useQuery } from "@apollo/client";
import { GET_TRENDINGS } from "../graphql/queries/GetTrendings";

export function useGetTrendings() {
  const {
    data: data_trending,
    loading: loading_trending,
    error: error_trending,
    refetch: refetch_trendings,
  } = useQuery(GET_TRENDINGS);

  return { data_trending, loading_trending, error_trending, refetch_trendings };
}
