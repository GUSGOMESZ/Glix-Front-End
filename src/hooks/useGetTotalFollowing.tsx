import { useQuery } from "@apollo/client";
import { GET_FOLLOWINGS } from "../graphql/queries/GetFollowings";

export function useGetTotalFollowing() {
  const {
    data: data_get_followings,
    loading: loading_get_followings,
    error: error_get_followings,
  } = useQuery(GET_FOLLOWINGS, {
    variables: { userId: localStorage.getItem("userId") },
  });

  return { data_get_followings, loading_get_followings, error_get_followings };
}
