import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../graphql/queries/GetFollowers";

export function useGetTotalFollowers() {
  const {
    data: data_get_followers,
    loading: loading_get_followers,
    error: error_get_followers,
  } = useQuery(GET_FOLLOWERS, {
    variables: { userId: localStorage.getItem("userId") },
  });

  return { data_get_followers, loading_get_followers, error_get_followers };
}
