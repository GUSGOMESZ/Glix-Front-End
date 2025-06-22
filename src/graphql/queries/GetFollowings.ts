import { gql } from "@apollo/client";

export const GET_FOLLOWINGS = gql`
  query GetFollowings($userId: ID!) {
    getFollowings(userId: $userId)
  }
`;
