import { gql } from "@apollo/client";

export const GET_USER_TOTAL_POSTS = gql`
  query GetUserTotalPosts($userId: ID!) {
    getUserTotalPosts(userId: $userId)
  }
`;
