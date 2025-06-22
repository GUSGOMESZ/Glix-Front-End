import { gql } from "@apollo/client";

export const GET_FOLLOWERS = gql`
  query GetFollowers($userId: ID!) {
    getFollowers(followedId: $userId)
  }
`;
